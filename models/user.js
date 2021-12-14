const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'firstname is required']
    },
    lastname:{
        type: String,
        required: [true, 'lastname is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    roles: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    password:{
        type: String,
        required: [true, 'password is required'],
        min: 6,
        max: 20
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})


UserSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})


const User = mongoose.model('User', UserSchema);

module.exports = User