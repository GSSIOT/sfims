const request   = require("request");
const dotenv    = require("dotenv").config({path : "../../../../.env"});
const statusGen = require("../../statusgenerator");
<<<<<<< HEAD
=======
const {logger}  = require("../../../server/winston")

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function recaptcha(req, res, next) {

<<<<<<< HEAD
    console.log(req.body['recaptcha']);
=======
    logger.info("ram.recaptcha");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

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

<<<<<<< HEAD
=======
        logger.info("ram.recaptcha.request");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
        const success = JSON.parse(body)["success"];

        if(error)     res.json(statusGen(002, `HTTP ERROR : ${error.message}`));
        if(!success)  res.json(statusGen(104, "recaptcha authentication failed"));
        else          next();
        
    })
    
}

module.exports = recaptcha;
