const User=require('../models/user');
const forgotPass=require('../models/forgotPass');
const bcrypt=require('bcrypt');
const  uuid=require('uuid');


exports.forgotPassword=async(req,res,next)=>{
    try{
        await   User.findOne({where:{email:req.body.email}})
    .then(user=>{
        if(!user)
        {
            res.json({message:'no user found'});
        }
       else{
       let id=uuid.v4();
         forgotPass.create({id,active:'true',userId:user.id}).then(response=>{
          res.json({message:'user found',link:'./forgot.html',id:response.id});
         }).catch(err=>res.json(err));
       }       
    })
    }
    catch(err)
    {
        res.json({err:err,message:'something went wrong'});
    } 
};

exports.postPassword=async (req,res,next)=>{
    try{
      await forgotPass.findOne({where:{id:req.body.id}}).then(pass=>{
        if(!pass)
        {
          res.json('no request found');
        }
        else{
          if(pass.active==='true')
          {
            let saltRounds=10;
            bcrypt.hash(req.body.cPass,saltRounds,async(err,hash)=>{
              try{
                await User.findOne({where:{id:pass.userId}}).then(user=>{
                  user.update({password:hash})
                  .then(response=>{
                      res.json({message:'password changed successfully'});
                      pass.update({active:'false'});
                  })
                });
              }
              catch(err)
              {
                res.json({err:err,message:'something went wrong'});
              }
              })    
          }
        }
      })
    }
    catch(err)
    {
      res.json({err:err,message:'something went wrong'});
    }
};
