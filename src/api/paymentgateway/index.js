const {makePayment}=require("./controller")

const {Router} =require("express");


const router=new Router()

router.post("/",makePayment);

module.exports=router