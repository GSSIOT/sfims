const cryptoJS  = require("crypto-js");
const dotenv    = require("dotenv").config({path : "../../../.env"});
const statusGen = require("../../statusgenerator");
const hmac      = require("../../../collect/hmac");
const runtime   = require("../../../runtime");
const {logger}  = require("../../../server/winston");

function message_authentication(req, res, next) {

    let method    = req.method;
    let url       = `${process.env.SVR_HOST}:${process.env.SVR_PORT}${req.url}`;
    let date      = req.headers['x-date'];
    let accessKey = req.headers['x-accesskey'];
    let signature = req.headers['x-signature'];

<<<<<<< HEAD
    console.log(url);
=======
    runtime.start();
>>>>>>> a4582eeb6269b7700875e59cc5a75b23cb7fc84c

    if(!date || !accessKey || !signature)  return res.send(statusGen(204, "Request Format Error"));

    if(hmac.get_signature(method, date, url) == signature) {
        logger.info("ram.message_authentication" + runtime.end());
        next();
    }

    else {
        res.json(statusGen(201, "Unauthorized signature"));
    }
}

module.exports = message_authentication;