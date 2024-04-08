
const redis = require('redis');
const db = require('../../db');
const { generateOtp, signUpUser, sendOtpToUser } = require('./services');
const { createJwtToken } = require('../../helper/commonfunctions');



const expiryTime = process.env.OTPEXPIRY_TIME;

let redisClient = redis.createClient()

const send = async (req, res, next) => {

    try {

        await redisClient.connect()
        const { mobileNumber,EmailId } = req.body;
        const otp = generateOtp()
        console.log("Otp is ",otp)
        // OTP Sent to Redis Server
        let result = await redisClient.setEx(mobileNumber, expiryTime, otp)
        // Send otp to user
         await sendOtpToUser(mobileNumber,EmailId,otp)

        req.data="OTP Sent Successfully"
        next();

    } catch (e) {
        console.log(e);
        res.send(e)

    } finally {
        if (redisClient) {
            redisClient.quit(); // Close the Redis client
        }
    }

}

const verify = async (req, res, next) => {

    try {
        await redisClient.connect()
        const { mobileNumber,emailId, otp } = req.body;

        let userData={
            mobilenumber:mobileNumber,
            email_id:emailId
        }
        let storedOtp = await redisClient.get(mobileNumber);

        if (storedOtp !== otp) {
            req.data = "OTP Expired/Incorrect Please try again."
            req.status = 400;
        }

        else {
            await redisClient.del(mobileNumber);

              // Save user in DB --if Not already Present
            let user=await signUpUser(userData);
            
            if(!user)
            throw new Error("Internal Server Error in Getting User with this mobile number");

            let jwtToken=await createJwtToken(user);
    
            // Create a JWT TOken and Send on frontend
            req.data = {
                token:jwtToken,
                message:"Successfully Loggedin"
            }
            req.status = 200;
        }


    } catch (e) {
        console.log(e);
        req.data = `Error While Verfying OTP: ${e}`;
        req.status = 500;
    } finally {
        await redisClient.quit();
        next();
    }
}


module.exports = { send, verify }

