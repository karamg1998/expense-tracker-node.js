const express=require('express');
const sequelize=require('./database/db');
const bodyparser=require('body-parser');

const userRoutes=require('./routes/userRoutes');
const expenseRoutes=require('./routes/expenseRoutes');
const payRoutes=require('./routes/razorpay');
const forgotRoutes=require('./routes/forgot-pass');

const expense=require('./models/expense-table');
const user=require('./models/user');
const order=require('./models/order');
const forgot=require('./models/forgotPass');

const cors=require('cors');
const app=express();

app.use(cors());
app.use(bodyparser.json());
app.use(userRoutes);
app.use(expenseRoutes);
app.use(payRoutes);
app.use(forgotRoutes);

user.hasMany(expense);
user.hasMany(order);
user.hasMany(forgot)


sequelize
.sync()
.then(app.listen(3000));