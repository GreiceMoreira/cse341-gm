const express = require('express');
const connectDB = require('./config/dbconfig')
const dotenv = require('dotenv').config();
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8080;

const entryRoutes = require('./routes/entries');
const swaggerRoute = require('./routes/swagger')

app
    .use(cors())
    .use(express.json())
    .use(swaggerRoute)
    .use('/entries', entryRoutes)


connectDB().then(()=> {
    app.listen(port, () => {
        console.log('Web Server is listening at port ', port)
    })
})

