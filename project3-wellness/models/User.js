const mongoose = require('mongoose');
const { hashPassword } = require('../utils/hashPassword');

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 16,
        max: 110,
    },
    avatar: {
        type: Number,
        enum: [1, 2, 3],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        this.password = await hashPassword(this.password);
        next();
    }catch (err) {
        next(err);
    }
})

const User = mongoose.model ('User', userSchema)
module.exports = User;