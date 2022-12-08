const User=require('../models/user');
const bcrypt=require('bcrypt');


exports.forgotPassword=async(req,res,next)=>{
    try{
        await   User.findOne({where:{email:req.body.email}})
    .then(user=>{
        if(!user)
        {
            res.json({message:'no user found'});
        }
        else{
            res.json({message:'user found',link:"./forgot.html",email:user.email});
        }
    })
    }
    catch(err)
    {
        res.json({err:err,message:'something went wrong'});
    }
 
};

exports.postPassword=async (req,res,next)=>{
    console.log(req.body);
  try{
    let saltRounds=10;
    bcrypt.hash(req.body.cPass,saltRounds,async(err,hash)=>{
    await User.findOne({where:{email:req.body.email}}).then(user=>{
        user.update({password:hash})
        .then(response=>{
            res.json({message:'password change successfully'});
        })
    });
    }) 
  }
  catch(err)
  {
    res.status(500).json({err:err,message:'something went wrong'});
  }
};
