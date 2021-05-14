const request   = require("request");
const dotenv    = require("dotenv").config({path : "../../../../.env"});
const statusGen = require("../../statusgenerator");

/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function recaptcha(req, res, next) {

    console.log(req.body['recaptcha']);

    let payload = {
        method  : "POST",
        uri     : "https://www.google.com/recaptcha/api/siteverify",
        headers : { "Content-Type" : "application/x-www-form-url-urlencoded" },
        form    : {
            secret   : process.env.RCT_SECRET_KEY,
            response : req.body['recaptcha'],
        },
    };

    request(payload, function(error, response, body) {

        const success = JSON.parse(body)["success"];

        if(error)     res.json(statusGen(002, `HTTP ERROR : ${error.message}`));
        if(!success)  res.json(statusGen(104, "recaptcha authentication failed"));
        else          next();
        
    })
    
}

module.exports = recaptcha;
