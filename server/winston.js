const winston                      = require("winston");
const winstonDaliy                 = require("winston-daily-rotate-file");
const logDir                       = "./log";
const {combine, timestamp, printf} = winston.format;
const expresswinston               = require("express-winston");

const logFormat = printf(({timestamp, level, message, stack}) => {
    if(stack)  return `${timestamp} ${level} - ${message}\n${stack}`;
    else       return `${timestamp} ${level} - ${message}`;
});


let logger = winston.createLogger({

    level : "debug",

    format : combine(
        timestamp({
            format : 'HH:mm:ss:SSS',
        }),
        logFormat,
    ),

    transports : [

        new winstonDaliy({
            level : 'info',
            datePattern : 'YYYY-MM-DD',
            dirname : logDir,
            filename : `app.%DATE%.log`,
            maxFiles : 10,
            zippedArchive : true
        }),

        new winstonDaliy({
            level : 'error',
            datePattern : 'YYYY-MM-DD',
            dirname : logDir,
            filename : `app.%DATE%.log`,
            maxFiles : 30,
            zippedArchive : true
        })
    ]
});

// if(process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format : winston.format.combine(
//             winston.format.colorize()
//         )
//     }))
// }


let expressWinston = expresswinston.logger({

    transports : [
        new winstonDaliy({
            level : "info",
            datePattern : 'YYYY-MM-DD',
            filename : `app.%DATE%.log`,
            dirname : logDir + "/express",
            zippedArchive : true,
        })
    ],

    // format : winston.format.combine(
    //     timestamp({
    //         format : 'HH:mm:ss:SSS',
    //     }),
    // ),

    // requestWhitelist : ["referer", "url", "body"],
    // bodyWhitelist : ["statusCode", "statusMessage"],
    // level : "info",
    // colorize : true,
    // meta : true,
    // msg : 'HTTP {{req.method}} {{req.url}}',

    meta : false,
    msg  : function(req, res) { return `${req.referer} - ${req.url} : ${res.body}` }
});



let expressErrorWinston = expresswinston.errorLogger({
    transports : [
        new winstonDaliy({
            level : "info",
            filename : `app.%DATE%.log`,
            dirname : logDir + "/express",
            zippedArchive : true,
        })
    ],

    meta : true,
    msg : 'HTTP {{req.method}} {{req.url}}',

})

module.exports = {logger, expressWinston, expressErrorWinston};