const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected!');
    }catch(err){
        console.error('Error connecting to MongoDB: ', err.message);
    }
};
    
module.exports = connectDB;