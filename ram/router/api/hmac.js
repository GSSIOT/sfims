const cryptoJS  = require("crypto-js");
const dotenv    = require("dotenv").config({path : "../../../.env"});
const statusGen = require("../../statusgenerator");
const hmac      = require("../../../collect/hmac");

function messageAuthentication(req, res, next) {

    console.log(req.body);
    
    let method    = req.method;
    let url       = `${process.env.SVR_HOST}:${process.env.SVR_PORT}${req.url}`;
    let date      = req.headers['x-date'];
    let accessKey = req.headers['x-accesskey'];
    let signature = req.headers['x-signature'];

    console.log(url);

    if(!date || !accessKey || !signature)  return res.send(statusGen(204, "Request Format Error"));

    if(hmac.get_signature(method, date, url) == signature) {
        next();
    }

    else {
        res.json(statusGen(201, "Unauthorized signature"));
    }
}

module.exports = messageAuthentication;