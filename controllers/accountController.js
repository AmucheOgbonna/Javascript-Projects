const Account = require('../models/Account');
const User = require('../models/User');
const AccountBalance = require('../models/AccountBalance');

exports.createAccount = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //if user exist
    if (!user) {
      return next('user doesnt exist');
    }
    const account = await Account.create({
      userId: user._id,
      accountNumber: req.body.accountNumber,
      accountName: `${user.firstname} ${user.lastname}`,
    });

    return res.status(201).json({
      status: 'success',
      data: account,
      message: 'account created',
    });
  } catch (error) {
    return next(error);
  }
};

exports.disableUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //if user exist
    if (!user) {
      return next('user doesnt exist');
    }
    const account = await Account.findByIdAndRemove(user._id)

    return res.status(201).json({
      status: 'success',
      data: account,
      message: 'Account Disabled',
    });
  } catch (error) {
    return next(error);
  }
};
exports.deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //if user exist
    if (!user) {
      return next('user doesnt exist');
    }
    const userDeleted = await User.findOneAndDelete(req.body.email)

    return res.status(201).json({
      status: 'success',
      data: userDeleted,
      message: 'Account Deleted',
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAllAccount = async (req, res, next) => {
  try {
    const account = await Account.find().populate({
      path: 'userId',
      select: 'email firstname lastname',
    });
    return res.status(201).json({
      status: 'success',
      data: account,
      message: 'account created',
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUserAccount = async (req, res, next) => {
  try {
    console.log(req.user);
    const account = await Account.findOne({ userId: req.user._id });

    if (!account) {
      return next(new Error('account does not exist'));
    }
    return res.status(201).json({
      status: 'success',
      data: account,
      message: 'account created',
    });
  } catch (error) {
    return next(error);
  }
};

exports.depositTransaction = async (req, res, next)=>{
  try {
    const account = await Account.findOne({accountNumber:req.body.accountNumber});
    // If accountNumber exists
    if(!account){
      return next('Invalid Account Number');
    }
   
    const oldBalance = await AccountBalance.findOne({accountNumber:account._id})
    const accountBalance = new AccountBalance({
      accountNumber: account._id,
      amount: req.body.amount,
      balance: Number(oldBalance.balance) + Number(req.body.amount)
    });
    // accountBalance.balance = await AccountBalance
    
    if(!accountBalance){
      await accountBalance.updateOne(
        {accountNumber: account._id},
        {$inc:{
          balance:AccountBalance.balance + req.body.amount
        }})
    }
    await accountBalance.save();
    return res.status(201).json({
      status: 'success',
      data: accountBalance,
      message: 'Deposit Successful',
    });
  } catch (error) {
    return next(error)
  }
}

exports.withdrawalTransaction = async (req, res, next)=>{
  try {
    const account = await Account.findOne({accountNumber:req.body.accountNumber});
    // If accountNumber exists
    if(!account){
      return next('Invalid Account Number');
    }
    // fetch old data
    const oldBalance = await AccountBalance.findOne({accountNumber:account._id})
    const accountBalance = new AccountBalance({
      accountNumber: account._id,
      amount: req.body.amount,
      balance:Number(oldBalance.balance) - Number(req.body.amount)
    });

    // if(accountBalance){
    //   await accountBalance.updateOne(
    //     {accountNumber: account._id},
    //     {$inc:{
    //       balance:AccountBalance.balance - req.body.amount
    //     }})
    // }
    await accountBalance.save();

    
    return res.status(201).json({
      status: 'success',
      data: accountBalance,
      message: 'Withdrawal Successful',
    });
  } catch (error) {
    return next(error)
  }
}
