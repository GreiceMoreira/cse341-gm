const express = require('express');
const app = express();
const lesson1 = require("./controllers/lesson1")

app.get('/', lesson1.emilyRoute );
app.get('/hannah', lesson1.hannaRoute);


const port = 3000;

app.listen(process.env.port || port);

console.log('Web Server is listening at port ' + (process.env.port || port));