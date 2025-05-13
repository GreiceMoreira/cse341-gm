const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express();
const port = 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/professional', require('./routes/api'));


app.listen(port);

console.log('Web Server ir listening at port ' + (process.env.port || port));
