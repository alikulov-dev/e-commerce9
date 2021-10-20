require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
require('dotenv').config();


module.exports = function() {
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({filename: 'logs/action.log', level: 'error'}));
    // winston.add(new winston.transports.MongoDB({db: process.env.DB_URI,
    //     options: {
    //         useUnifiedTopology: true
    //     }
    // }));

    winston.exceptions.handle(new winston.transports.Console(), new winston.transports.File({filename: 'logs/action.log'}));
    process.on('unhandledRejection', ex => {
            throw ex;
        }
    );
}
