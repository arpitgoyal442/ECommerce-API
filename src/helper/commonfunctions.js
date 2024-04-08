
const jwt =require("jsonwebtoken")
const nodemailer=require('nodemailer')
const { otpMailTemplate } = require("../constant/constant")
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY
const JWT_EXPIRY_TIME=process.env.JWT_EXPIRY_TIME


const createJwtToken=async (userData)=>{

    try{
        const user={
            id:userData.id,
            mobileNumber:userData.mobilenumber
        }
        let token=jwt.sign(user,JWT_SECRET_KEY, { expiresIn: JWT_EXPIRY_TIME })
        return token;

    }catch(e){
        console.log(e)
        throw e
    }

}

const verifyJwtToken=(token)=>{

    try{

        if (!token) {
            return {
                message:"Missing Token",
                user:null
            }
           
        }
    
        // Verify token using the secret key
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
            return{
                message:"Invalid Token",
                user:null
            }
            }
               
            else {
                return {

                    message:"Valid Token",
                    user:  decoded.user

                }
            }
            
           
           
        });

    }catch(e){
        console.log(e)

        throw new Error(e);


    }


}



const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{

        user:process.env.GMAIL,
        pass:process.env.GMAIL_PASS
    }
})

const sendMail=async(to,text,isOTP)=>{
    try{
        const mailOptions={
            from:process.env.GMAIL,
            to:to,
            subject:'Login OTP || EZLiving',
            html: isOTP? otpMailTemplate(text):``
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error)
            throw error;
           
            else console.log("Mail Info :",info)
        })

    }catch(e){
        console.log(e)
        throw e
    }
}

module.exports={createJwtToken,verifyJwtToken,sendMail}