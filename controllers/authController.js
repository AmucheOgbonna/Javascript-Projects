const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/User");

const signToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_SECRET_EXPIRES_IN });
};


exports.register = async (req, res, next) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    //check if email exists
    if (userExist) {
      return next(new Error("email has been taken"));
    }
    //creat user
    const user = await User.create(req.body);
    user.password = undefined;
    return res.status(201).json({
      status: "success",
      data: user,
      message: "User created",
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new Error("User does not exist"));
    }

    //compare password
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return next(new Error("invalid details"));
    }

    //if successful 
    const token = signToken(user._id)
      user.password = undefined;
    return res.status(201).json({
      status: "success",
      data: user,
      message: "login successful",
      token
    });
  } catch (error) {
    return next(error);
  }
};

//protect routes
exports.protectedRoutes = async (req, res, next)=>{
    try {
        let token;
         // 1) Getting token and check of it's there
       if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } 

        if(!token){
            return next(new Error('unauthorized please login'))
        }
 
      // 2) Verification token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(
          new Error('The user belonging to this token does no longer exist.'),
        );
      }
      // GRANT ACCESS TO PROTECTED ROUTE
      req.user = currentUser;
      return next();
    } catch (error) {
        return next(error)
    }
}

exports.myProfile =(req, res, next)=>{
    req.user.password = undefined
    return res.status(200).json({
        status: 'success',
        data: req.user,
        message: 'profile details fetched'
    })
}

exports.restrictRoutes =(...roles)=>{
    return (req, res, next)=>{ 
        // roles ['admin', 'user'] role='user'
      console.log(roles.includes(req.user.role));
      if (!roles.includes(req.user.role)) {
        return next(
          new Error(
            'You do not have permission to perform for this action',
           ),
        );
      }
      return next();
    };
     }
