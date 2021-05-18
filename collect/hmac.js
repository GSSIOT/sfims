const crypto   = require("crypto");
const cryptoJS = require("crypto-js");
const SHA256   = require("crypto-js/sha256");
const Base64   = require("crypto-js/enc-base64");
<<<<<<< HEAD
=======
const {logger} = require("../server/winston");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
const dotenv   = require("dotenv").config({path : "../.env"});



/**
 * @abstract
 * @member
 * 
 * 
 */
function hmac() {

    this.func = null;
    // console.log("hmac");

}



/**
 * @abstract
 * @param {*} method 
 * @param {*} date 
 * @param {*} url 
 * @returns 
 */
hmac.prototype.get_signature = function (method, date, url) {

<<<<<<< HEAD
=======
    logger.info("hmac.get_signature");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    let   hash;
    const SECRET_KEY = process.env.API_SECRET_KEY;
    const ACCESS_KEY = process.env.API_ACCESS_KEY;
    const func = cryptoJS.algo.HMAC.create(cryptoJS.algo.SHA256, "GSSIOT");
<<<<<<< HEAD
    
    //console.log("param : ", method, date, url);
=======
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

    func.update(method);
    func.update(" ");
    func.update(url);
    func.update("\n");
    func.update(date);
    func.update("\n");
    func.update("GSSIOT");

    hash = func.finalize();
<<<<<<< HEAD
=======

    //console.log(hash.toString(cryptoJS.enc.Base64));
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    return hash.toString(cryptoJS.enc.Base64);
}




module.exports = new hmac();
