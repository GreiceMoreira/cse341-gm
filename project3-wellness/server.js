const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const swaggerUi = require('swagger-ui-express');

const entryRoutes = require('./routes/entries');
const swaggerRoute = require('./routes/swagger')

const app = express();
const port = (process.env.PORT || 8080);

app
    .use(express.json())
    .use(swaggerRoute)
    .use('/api/entries', entryRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then( () => {
    console.log('MongoDB connected!');
    app.listen(port, () => {
        console.log('Web Server is listening at port ', port)
    }
    )})

    .catch(err => console.log('Error connexting to MongoDB: ', err));
