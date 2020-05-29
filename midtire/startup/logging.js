const winston = require('winston');
require('winston-mongodb'); 

module.exports = function(){

    process.on('unhandledRejection', (ex)=>{
        throw ex;
    })
    winston.add(winston.transports.File, { filename: 'logfile.log'});
    process.on('uncaughtException', (ex)=>{
        console.log('we got a uncaught exception.');
        winston.error(ex.message, ex);  
    })

}