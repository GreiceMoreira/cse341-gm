const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const entryRoutes = require('./routes/entries');

const app = express();
const port = (process.env.PORT || 8080);

app
    .use(express.json())
    .use('/api/entries', entryRoutes);

mongoose.connect(process.env.MONGODB_URL)
    .then( () => {
    console.log('MongoDB connected!');
    app.listen(port, () => {
        console.log('Web Server ir listening at port ', port)
    }
    )})

    .catch(err => console.log('Error connexting to MongoDB: ', err));
