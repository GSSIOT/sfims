const cryptoJS  = require("crypto-js");
const dotenv    = require("dotenv").config({path : "../../../.env"});
const statusGen = require("../../statusgenerator");
const hmac      = require("../../../collect/hmac");
const runtime   = require("../../../server/runtime");
const {logger}  = require("../../../server/winston");
const check_param = require("../../checkparma");

function message_authentication(req, res, next) {

    let method    = req.method;
    let url       = `${process.env.HMAC_URL}${req.url}`;
    let date      = req.headers['x-date'];
    let accessKey = req.headers['x-accesskey'];
    let signature = req.headers['x-signature'];

    runtime.start();
    logger.info("ram.message_authentication" + runtime.end());

    if(!check_param(date, accessKey, signature))  return res.send(statusGen(300, "비인가 요청 메시지"));
    if(hmac.get_signature(method, date, url) == signature) {
        next();
    }
    else {
        res.json(statusGen(201, "Unauthorized signature"));
    }

}

module.exports = message_authentication;