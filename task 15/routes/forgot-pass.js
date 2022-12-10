const express=require('express');
const passController=require('../controllers/forgot-pass');
const router=express.Router();

router.post('/forgotpassword',passController.forgotPassword);
router.post('/success/forgotPass',passController.postPassword);

module.exports=router;