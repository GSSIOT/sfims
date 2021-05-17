const cryptoJS  = require("crypto-js");
const dotenv    = require("dotenv").config({path : "../../../.env"});
const statusGen = require("../../statusgenerator");
const hmac      = require("../../../collect/hmac");

function messageAuthentication(req, res, next) {

    let method    = req.method;
    let url       = `http://localhost:1235${req.url}`;
    let date      = req.headers['x-date'];
    let accessKey = req.headers['x-accesskey'];
    let signature = req.headers['x-signature'];

    if(!date || !accessKey || !signature)  return res.send(statusGen(204, "Request Format Error"));
    console.log(date);
    console.log(accessKey);
    console.log(signature);
    console.log(url);

    if(hmac.get_signature(method, date, url) == signature) {
        next();
    }

    else {
        res.json(statusGen(201, "Unauthorized signature"));
    }
}

module.exports = messageAuthentication;