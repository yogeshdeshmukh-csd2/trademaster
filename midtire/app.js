
const winston = require('winston');
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());



//passing app reference to startup/routes
require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/config')();



const port = process.env.PORT || 3000;
const server = app.listen(port,()=>{
    winston.info(`listening to port ${port}!`);
})

module.exports = server;