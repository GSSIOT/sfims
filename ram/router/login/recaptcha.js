const request     = require("request");
const dotenv      = require("dotenv").config({path : "../../../../.env"});
const statusGen   = require("../../statusgenerator");
const {logger}    = require("../../../server/winston");
const runtime     = require("../../../runtime");
const check_param = require("../../checkparma")



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function recaptcha(req, res, next) {

    let payload  = null;
    let _recaptcha = req.body['recaptcha'];

    runtime.start();

    if(!check_param(_recaptcha)) {
        logger.info("ram.recaptcha.request" + runtime.end());
        res.send({statusCode : 104, statusMessage : "recaptcha authentication failed"});
        return;
    }

    payload = {
        method  : "POST",
        uri     : "https://www.google.com/recaptcha/api/siteverify",
        headers : { "Content-Type" : "application/x-www-form-url-urlencoded" },
        form    : {
            secret   : process.env.RCT_SECRET_KEY,
            response : _recaptcha,
        },
    };


    request(payload, function(error, response, body) {

        logger.info("ram.recaptcha.request");

        const success = JSON.parse(body)["success"];

        if(error)     res.json(statusGen(002, `HTTP ERROR : ${error.message}`));
        if(!success)  res.json(statusGen(105, "recaptcha authentication failed"));
        else          next();
        
    })
    logger.info("ram.recaptcha" + runtime.end());
}

module.exports = recaptcha;
