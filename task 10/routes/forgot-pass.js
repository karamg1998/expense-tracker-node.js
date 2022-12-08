const express=require('express');
const passController=require('../controllers/forgot-pass');
const router=express.Router();

router.post('/forgotpassword',passController.forgotPassword);
module.exports=router;