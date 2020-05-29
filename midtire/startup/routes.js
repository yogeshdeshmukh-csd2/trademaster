const express = require('express');

const error = require('../middleware/error');
const trade = require('../routes/trade');

module.exports = function(app){
    //middleware to extract body
app.use(express.json());
app.use('/',trade);
app.use((req, res, next) => {res.header('Access-Control-Allow-Origin', '*');
        next();
        });
app.use(error);
}
