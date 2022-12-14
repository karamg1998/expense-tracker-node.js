const User=require('../models/user');

exports.postUser=async (req,res,next)=>{
  if(req.body.name==='' && req.body.email=='' && req.body.pass=='')
  {
    throw new Error('all the fields are mendatory');
  }
  try{
    await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.pass
  }).then(user=>{
    res.json(user);
    console.log('user signed up');
  });
  }
  catch(err){
    res.status(500).json(err);
    console.log('error in creating user');
  }
};

exports.loginUser=(req,res,next)=>{
  let email=req.body.email;
  let password=req.body.pass;
  User.findAll({where:{email:email,password:password}})
  .then(user=>{
    res.json(user);
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json(err);
  });
};