const mongoose = require('mongoose');

const AccountBalanceSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    amount: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
module.exports = mongoose.model('AccountBalance', AccountBalanceSchema);
