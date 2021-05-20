const request  = require("request");
const bcrypt   = require("./bcrypt");
const hmac     = require("./hmac");
const dbm      = require("../db/dbm");
const dotenv   = require("dotenv").config({path : "../.env"});
const errorGen = require("../error");
const {logger} = require("../server/winston");
const farmData = require("../farmdata");
const runtime  = require("../runtime");



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
collector.prototype.init = async function () {

    this.dbm     = dbm;
    this.bcrypt  = bcrypt;
    this.hmac    = hmac;
    
    logger.info("collector.init");

    if(!this.dbm || !this.bcrypt || !this.hmac)  return false;
    setInterval(async ()=> {await this.collect()}, 1000 * 90);
    return true;
}


/**
 * @description
 */
 collector.prototype.collect = async function () {

    let result  = true;

    runtime.start();

    try {
        farmEnv = await this.get_data("data", -1);
        farmEnv = this.standardize_data(farmEnv);
        console.log(farmEnv);
        
        for(let value of farmEnv) {
            result &= await dbm.insert("INSERT INTO ENVINFOTABLE VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", value);
        }
    }
    
    catch(error) {
        logger.error(error);
    }

    finally {
        logger.info("collector.collect" + runtime.end());
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
        logger.error(error);
    }
}



/**
 * @description
 */
collector.prototype.terminate = function () {

    logger.info("collector.terminate");
}



/**
 * @description
 * @param {*} form 
 */
collector.prototype.generate_message = function (api, farmId) {

    const method    = "POST";
    const date      = Date.now().toString();
    const url       = process.env.GSS_CLOUD + `/${api}`;
    const accessKey = process.env.API_ACCESS_KEY;

    const payload   = {
        method  : method,
        uri     : url,
        headers : { "x-date" : date, "x-accesskey" : accessKey, "x-signature" : hmac.get_signature(method, date, url)},
        body    : { "Farmid" : farmId },
        json    : true 
    }

    logger.info("collector.generate_message");

    return payload;
}



/**
 * @description
 * @param {*} data 
 */
collector.prototype.standardize_data = function (farmData) {
    
    let envData = [];

    for (let idx = 0; idx < farmData.length; ++idx) {
        envData.push([]);
        for (let prop in farmData[idx]) {
            envData[idx].push(farmData[idx][prop]);
        }
    }
    logger.info("collector.standardize_data");

    return envData;
}



/**
 * @description 
 * @param {*} options
 * @param {*} api
 */
collector.prototype.get_data = function (api, farmId) {

    return new Promise((resolve, reject) => {
        
        let payload = this.generate_message(api, farmId);        

        request(payload, function(error, response, body) {
            logger.info("collector.get_data_reuquest");
            if(error)  reject(error);
            else       resolve(body);
        });    

        logger.info("collector.get_data");
    })
}




/**
 * @description
 */
module.exports = new collector();
