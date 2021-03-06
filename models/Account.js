const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    accountNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    accountName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
module.exports = mongoose.model('Account', AccountSchema);
