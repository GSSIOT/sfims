const cryptoJS  = require("crypto-js");
const dotenv    = require("dotenv").config({path : "../../../.env"});
const statusGen = require("../../statusgenerator");
const hmac      = require("../../../collect/hmac");

function messageAuthentication(req, res, next) {

<<<<<<< HEAD
    let method    = req.method;
    let url       = `http://localhost:1235${req.url}`;
=======
    console.log(req.body);
    
    let method    = req.method;
    let url       = `${process.env.SVR_HOST}${req.url}`;
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    let date      = req.headers['x-date'];
    let accessKey = req.headers['x-accesskey'];
    let signature = req.headers['x-signature'];

    if(!date || !accessKey || !signature)  return res.send(statusGen(204, "Request Format Error"));
<<<<<<< HEAD
    console.log(date);
    console.log(accessKey);
    console.log(signature);
    console.log(url);
=======
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

    if(hmac.get_signature(method, date, url) == signature) {
        next();
    }

    else {
        res.json(statusGen(201, "Unauthorized signature"));
    }
}

module.exports = messageAuthentication;