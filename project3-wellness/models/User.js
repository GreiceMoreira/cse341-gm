const mongoose = require('mongoose');

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

const User = mongoose.model ('User', userSchema)
module.exports = User;