const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    recipientName: {
      type: String,
      required: true,
    },
    depositorName: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      ref: 'Account',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
module.exports = mongoose.model('Transaction', TransactionSchema);
