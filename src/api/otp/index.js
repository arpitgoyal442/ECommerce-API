const {Router} =require("express");

const sendResponse = require("../../middleware/response");
const { send, verify } = require("./controller");


const router=new Router();

router.post("/send",send,sendResponse)
router.post("/verify",verify,sendResponse)


module.exports=router