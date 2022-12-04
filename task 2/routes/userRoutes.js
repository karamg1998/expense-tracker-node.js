const userController=require('../controllers/user');
const express=require('express');
const router=express.Router();

router.post('/user/signup',userController.postUser);

module.exports=router;