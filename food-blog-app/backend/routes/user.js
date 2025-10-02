const express=require("express")
const router=express.Router()
const {userSignUP,userLogin,getUser}=require("../controller/user")

router.post("/signUp",userSignUP)
router.post("/login",userLogin)
router.get("/user/:id",getUser)

module.exports=router