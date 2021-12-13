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

const User=require('./models/user')


app.get('/ping', (req,res)=>{
    res.status(200).send('Hello World!');
})
// User

app.post('/auth/signup', async (req,res)=>{
    const data = req.body;
    try {
        const passwordHash = await bcrypt.hash(data.password, 10);
        const user = await new User({
            fullname:data.fullname,
            email:data.email,
            bvn:data.bvn,
            accountno:data.accountno,
            password:passwordHash
        }).save();
        const token = jwt.sign({user_id:user._id}, JWT_SECRET_KEY, {expiresIn:60*10});

        res.status(201).send({
            message:"User Created",
            data:{
            fullname:user.fullname,
            email:user.email,
            accountno:user.accountno,
            token,
            user_id:user._id
            }
        })
    } catch (error) {
        res.status(400).send({
            message:"User couldn't be created", error:error.message
        })
    }
})

app.post('/auth/signin', async (req,res)=>{
    const data = req.body;
    try {
        const user = await User.findOne({
            email:data.email
        })
        if(!user){
            return res.status(400).send({message:"User does not exist"})
        }
        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if(!isValidPassword){
            return res.status(400).send({
                message:"Invalid email or password"
            })
        }
        const token = jwt.sign({user_id:user._id}, JWT_SECRET_KEY);
        res.status(201).send({
            message:"Login Successful",
            data:{
                token, email:user.email,fullname:user.fullname, user_id:user._id
            }
        })

    } catch (error) {
        res.status(400).send({
            message:"Login failed  XXXX", error:error.message
        })
    }
})

app.patch('')


app.listen(port, async ()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB DB');
    }catch(error){
        console.log("Couldn't connect to DB");
    }

    console.log(`:::> Lisening on http://localhost:${port}`);
})