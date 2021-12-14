const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
        unique:true
    },
    title_of_transaction:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }},
    {
        timestamps:{
            createdAt:"created_at",
            updatedAt:"updated_at"
        }
    }
    
    )

module.exports=mongoose.model('account',AccountSchema);