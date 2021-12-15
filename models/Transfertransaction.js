const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransferSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
    to: {
      type: Number,
      default: 0,
      required: true,
    },
    accountNumber: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

module.exports = mongoose.model('Transfer', TransferSchema);

//transfer
//from, to, amount, accountnumber
