const crypto   = require("crypto");
const cryptoJS = require("crypto-js");
const SHA256   = require("crypto-js/sha256");
const Base64   = require("crypto-js/enc-base64");
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

    let   hash;
    const SECRET_KEY = process.env.API_SECRET_KEY;
    const ACCESS_KEY = process.env.API_ACCESS_KEY;
    const func = cryptoJS.algo.HMAC.create(cryptoJS.algo.SHA256, "GSSIOT");
    
    //console.log("param : ", method, date, url);

    func.update(method);
    func.update(" ");
    func.update(url);
    func.update("\n");
    func.update(date);
    func.update("\n");
    func.update("GSSIOT");

    hash = func.finalize();
    return hash.toString(cryptoJS.enc.Base64);
}




module.exports = new hmac();
