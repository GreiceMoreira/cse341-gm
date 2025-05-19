const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
const port = (process.env.PORT || 8080);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(express.json())

mongoose.connect(process.env.MONGODB_URL)
    .then( () => {
    console.log('MongoDB connected!');
    app.listen(port, () => {
        console.log('Web Server ir listening at port ', port)
    }
    )})

    .catch(err => console.log('Error connexting to MongoDB: ', err));

    
app.use('/contacts', require('./routes/contacts'));

