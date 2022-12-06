const Sequelize=require('sequelize');

const sequelize=new Sequelize('expense-tracker','root','Kgarathi@135',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;