const express=require('express');
const sequelize=require('./database/db');
const bodyparser=require('body-parser');
const userRoutes=require('./routes/userRoutes');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(bodyparser.json());
app.use(userRoutes);

sequelize
.sync()
.then(app.listen(3000));