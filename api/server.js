'use strict';
const express = require('express');
const app = express();
const port = 8080;
const components = require('./components');

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/photos', components.photos.router);

app.listen(port);