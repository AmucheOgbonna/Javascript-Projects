const mongoose = require("mongoose");
const Schema = mongoose.Schema

const TransactionSchema = new Schema(
    {
   description:{
        type:String,
        required:true,
        default:"deposit" || "withdrawal" || "transfer"
    },
    amount:{
        type:Number,
        default:0,
        required:true
    },
    userID:[
        {
        type:Schema.Types.ObjectId,
        ref:"usertest",
        required:true
        }
],
},
{
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
})

module.exports = mongoose.model('transactiontest',TransactionSchema)