const express = require('express');
const app = express();

const port = 3000;

app.use('/', require("./src/controllers/routes"))

app.listen(process.env.port || port);

console.log('Web Server is listening at port ' + (process.env.port || port));