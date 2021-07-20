const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dateFormat= require('dateformat');
const routes = require('./Routes');
const port = 5000;

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(
    'mongodb://localhost/easy-bus',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
    console.log('Esta aplicacion corre en la ruta http://localhost:5000/')
});

app.use('/', routes());