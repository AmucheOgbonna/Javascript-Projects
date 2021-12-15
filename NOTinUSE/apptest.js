const express = require('express');
const app = express();
const morgan= require('morgan');
require('dotenv').config();

// SETTING UP DATABASE
const mongoose = require('mongoose');
const MONGODB_URI= process.env.MONGODB_URI

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const port = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const auth=require('./middlewares/auth')
// const User=require('./models/Usertest')
const Transaction = require('./models/transactiontest')
const Account =require('./models/Accounttest');
const Usertest = require('./models/Usertest');


app.get('/ping', (req,res)=>{
    res.status(200).send('Hello World!');
})
// User
app.post('/api/auth/register',async (req,res)=>{
    try {
        const data = req.body;
        const user = await new User({
            firstname:data.firstname,
            lastname:data.lastname,
            password:data.password,
            email:data.email,
        }).save();
        res.status(201).send({message:"User Created", data: user})
    } catch (error) {
        res.status(400).send({message:"User Created", error:error.message })
    }
})

app.post('/api/auth/login',async (req,res)=>{
    try {
        const data = req.body;
        const user = await User.findOne({email:data.email});
        if(!user){
            res.status(400).send({message:"User does not exist",error:error.message})
        }
        if(user.password !== data.password){
            res.status(400).send({message:"Invalid User or Password",error:error.message})
        }
        res.status(201).send({message:"Login Successful", data: {
            fullname:user.firstname +" "+ user.lastname, email:user.email, userID:user._id}})
    } catch (error) {
        res.status(400).send({message:"Login Failed XXXXX", error:error.message })
    }
})

app.post('/api/user/firstdeposit', async (req,res)=>{
    try {
        const data = req.body;
        const check = Transaction.find({amount:{$exists:false}});
        if(!check){
            return res.status(400).send({message:"First Deposit already made", error:error.message })
        }
        const transaction = await new Transaction({
            description:data.description,
            amount:data.amount,
            userID:data.userID
        }).save()
  
        res.status(201).send({message:"Deposit Successful", data: transaction})
    } catch (error) {
        res.status(400).send({message:"Deposit Failed XXXXX", error:error.message })
    }
})


app.put('/api/user/deposit/:user_id', async (req,res)=>{
    const data= req.body;
    try {
        const user = await Usertest.findOne({userID:req.params.user_id});
        if(user._id == req._ID){
            return res.status(403).send(
                {message:"Invalid account details"}
            )}
       
        const transaction = await Usertest.findByIdAndUpdate(req.params.user_id,
            {$push:{
                transaction:{
                    "amount" : data.amount,
                    "description":data.description
                }
            },$inc: { amount: data.amount } ,
            },{new:true}) 

            res.status(200).send({message: "Deposit Successful!!!", data: transaction})
    } catch (error) {
        res.status(400).send({message: "Failed Deposit XXXX", error:error.message})
    }
})


// ROUTES NOT FOUND
app.use("**", ( req, res,next)=>{
    res.status(404).send({message:"Route not found"})
})

// ERROR MIDDLEWARE
app.use((error, req, res,next)=>{
    console.log(error);
    res.status(500).send({message:"Something went wrong", error: error.message})
})

app.listen(port, async ()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB DB');
    }catch(error){
        console.log("Couldn't connect to DB");
    }

    console.log(`:::> Listening on http://localhost:${port}`);
})