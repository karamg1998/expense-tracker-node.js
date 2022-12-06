const express=require('express');
const sequelize=require('./database/db');
const bodyparser=require('body-parser');
const userRoutes=require('./routes/userRoutes');
const expenseRoutes=require('./routes/expenseRoutes');

const expense=require('./models/expense-table');
const user=require('./models/user');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(bodyparser.json());
app.use(userRoutes);
app.use(expenseRoutes);

user.hasMany(expense);


sequelize
.sync()
.then(app.listen(3000));