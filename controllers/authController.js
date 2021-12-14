const User = require('../models/User')

exports.register = async(req, res, next)=>{
    try{
        
        return res.status(201).json({
            success: true,
            data: req.body,
            message: 'user created'
        })
    }catch(error){
        return next(error)
    }

}