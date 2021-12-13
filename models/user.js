const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname:{
        required:true,
        type:String
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    bvn:{
        required:true,
        unique:true,
        type:Number,
        // minlength:12,
        // maxlength:12
    },
    accountno:{
        required:true,
        type:Number,
        unique:true,
        // minlength:10,
        // maxlength:10
    },
    disable:{
        default:false,
    },
    password:{
        type: String,
        required:true
    },
    amount:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model('user',UserSchema);