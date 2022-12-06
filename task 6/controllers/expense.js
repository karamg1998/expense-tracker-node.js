const Expense=require('../models/expense-table');

exports.postExpense=async (req,res,next)=>{
 try{
  await Expense.create({
    amount:req.body.amount,
    description:req.body.description,
    category:req.body.category
  }).then(expense=>{
    res.json(expense);
    console.log('expense created');
  })
 }
 catch(err)
 {
  res.status(500).json({err:err,message:'error in creating expense'});
  console.log('error in creating expense');
 }
};

exports.getExpense=async (req,res,next)=>{
  try{
   await Expense.findAll()
   .then(expense=>{
    res.json(expense);
    console.log('expense sent');
  });
  }
  catch(err){
    res.status(500).json({err:err,message:'error in getting all expense'})
    console.log('error in getting expense');
  }
}; 

exports.delExpense=async (req,res,next)=>{
    let Id=req.params.id;
    try{
      await Expense.findByPk(Id)
      .then(expense=>{
        expense.destroy();
        res.json({success:true,message:'expense deleted'});
        console.log('expense deleted');
      });
    }
    catch(err){
          console.log('error in deleting expense');
          res.status(500).json({success:false,message:'error in deleting expense'});
    }
};
