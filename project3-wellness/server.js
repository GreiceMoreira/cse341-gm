const express = require('express');
const connectDB = require('./config/dbconfig')
const dotenv = require('dotenv').config();
const swaggerUi = require('swagger-ui-express');

const entryRoutes = require('./routes/entries');
const swaggerRoute = require('./routes/swagger')


const app = express();
const port = process.env.PORT || 8080;

app
    .use(express.json())
    .use(swaggerRoute)
    .use('/entries', entryRoutes)


connectDB().then(()=> {
    app.listen(port, () => {
        console.log('Web Server is listening at port ', port)
    })
})
