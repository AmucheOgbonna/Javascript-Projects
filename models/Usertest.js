const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
   firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    transaction:[
        {
        type:Schema.Types.ObjectId,
        ref:"transactiontest",
        }
]
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

module.exports = mongoose.model('usertest',UserSchema)