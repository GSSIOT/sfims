const request  = require("request");
const bcrypt   = require("./bcrypt");
const hmac     = require("./hmac");
const dbm      = require("../db/dbm");
const dotenv   = require("dotenv").config({path : "../.env"});
const errorGen = require("../error");



/**
 * @description
 */
function collector() {
    this.dbm     = null;
    this.bcrypt  = null;
    this.request = null;
    this.hmac    = null;
}



/**
 * @description
 * @param {*} dbm 
 */
collector.prototype.init = function () {

    this.dbm     = dbm;
    this.bcrypt  = bcrypt;
    this.hmac    = hmac;

    if(!this.dbm || !this.bcrypt || !this.hmac)  return false;

    console.log("collector init");
    return true;
}



/**
 * @description
 */
 collector.prototype.collect = async function () {

    let farmEnv = null;
    let result  = false;

    try {
        farmEnv = await this.get_data("data");
        result  = await dbm.insert("INSERT INTO ENVINFOTABLE VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", this.standardize_data(farmEnv));
    }
    
    catch(error) {
        console.log(error);
    }

    finally {
        if(!result)  return true;
        else         return false;
    }
}



/**
 * @description
 * @param {*} query 
 * @returns 
 */
collector.prototype.process_RAMrequest = async function (query) {

    try {
        return await this.get_data(api);
    }
    catch(error) {
        // log
        throw error;
    }
}



/**
 * @description
 */
collector.prototype.terminate = function () {

    console.log("teminated collector");
}



/**
 * @description
 * @param {*} form 
 */
collector.prototype.generate_message = function (api) {

    const method    = "POST";
    const date      = Date.now().toString();
    const url       = process.env.GSS_CLOUD + `/${api}`;
    const accessKey = process.env.API_ACCESS_KEY;

    const payload   = {
        method  : method,
        uri     : url,
        headers : { "x-date" : date, "x-accesskey" : accessKey, "x-signature" : hmac.get_signature(method, date, url)},
        body    : { "Farmid" : -1 },
        json    : true 
    }

    //console.log(payload)

    return payload;
}



/**
 * @description
 * @param {*} data 
 */
collector.prototype.standardize_data = function (farmData) {
    

    let envData = [];

    for (let prop in farmData[0]) {
        envData.push(farmData[0][prop]);
    }

    console.log(envData);
    return envData;
}



/**
 * @description
 * @param {*} query 
 * @returns 
 */
collector.prototype.get_data = function (options, api) {

    return new Promise((resolve, reject) => {
        
        let payload = this.generate_message(options, api);        

        request(payload, function(error, response, body) {
            if(error)  reject(errorGen(error, "get_data"));
            else       resolve(body);
        });    
    })
}




/**
 * @description
 */
module.exports = new collector();
