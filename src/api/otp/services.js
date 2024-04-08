const { USER_TBL } = require("../../constant/constant");
const db = require("../../db");
const { sendMail } = require("../../helper/commonfunctions");
const { insertObjectQuery, selectQuery } = require("../../helper/queryhelper");



 const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000) + "";
}


//SignUp By Mobile Number Only
 const signUpUser=async(userData)=>{

    //Check if user if present
    let userQry=selectQuery(USER_TBL,['*'],{mobilenumber:userData.mobilenumber});
    let user=await db.query(userQry);
     user=user?.rows?.[0];

     if(user){
        return user;
     }else{
        let insertQry=insertObjectQuery(USER_TBL,userData);
        user=await db.query(insertQry);
        return user?.rows?.[0];
     }
}


const sendOtpToUser=async(mobile,Email,otp)=>{

   console.log()

   try{

      sendMail(Email,otp,true)


   }catch(e){

      throw e

   }

}



module.exports={generateOtp,signUpUser,sendOtpToUser}