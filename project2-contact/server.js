const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 8080;

mongoose.connect(process.env.MONGODB_URL)
    .then( () => {
    console.log('MongoDB connected!');
    app.listen(port);
    console.log('Web Server ir listening at port ' + (process.env.port || port));
    })

    .catch(err => console.log('Error connexting to MongoDB: ', err));

    
app.use('/contacts', require('./routes/contacts'));

