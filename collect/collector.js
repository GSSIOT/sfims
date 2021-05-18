const request  = require("request");
const bcrypt   = require("./bcrypt");
const hmac     = require("./hmac");
const dbm      = require("../db/dbm");
const dotenv   = require("dotenv").config({path : "../.env"});
const errorGen = require("../error");
<<<<<<< HEAD
const openAPI  = require("./openapi");
=======
const {logger} = require("../server/winston");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f



/**
 * @description
 */
function collector() {
    this.dbm     = null;
    this.bcrypt  = null;
    this.request = null;
    this.hmac    = null;
<<<<<<< HEAD
    this.openAPI = null;
=======
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
}



/**
 * @description
 * @param {*} dbm 
 */
<<<<<<< HEAD
collector.prototype.init = function () {
=======
collector.prototype.init = async function () {

    logger.info("collector.init");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

    this.dbm     = dbm;
    this.bcrypt  = bcrypt;
    this.hmac    = hmac;
<<<<<<< HEAD
    this.openAPI = openAPI;

    if(!this.dbm || !this.bcrypt || !this.hmac || !this.openAPI)  return false;

    console.log("collector init");
=======

    if(!this.dbm || !this.bcrypt || !this.hmac)  return false;
    setInterval(async ()=> {await this.collect()}, 1000 * 30);

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    return true;
}


<<<<<<< HEAD

=======
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
/**
 * @description
 */
 collector.prototype.collect = async function () {

<<<<<<< HEAD
    try {
        let farmEnv = await this.get_data("data");
        // console.log(openAPI.get_weather());
        // let outEnv  = await this.openAPI.get_weather("Goyang-si");
        
        console.log(this.standardize_data(farmEnv));
        // console.log(outEnv);

        let result  = await dbm.insert("INSERT INTO ENVINFOTABLE VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", this.standardize_data(farmEnv));
    }
    
    catch(error) {
        console.log(error);
=======
    logger.info("collector.collect");
    
    let farmEnv = null;
    let result  = false;

    try {
        farmEnv = await this.get_data("data");
        console.log(farmEnv);
        result  = await dbm.insert("INSERT INTO ENVINFOTABLE VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", this.standardize_data(farmEnv));
    }
    
    catch(error) {
        logger.error(error);
    }

    finally {
        if(!result)  return true;
        else         return false;
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
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
<<<<<<< HEAD
        // log
        throw error;
=======
        logger.error(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }
}



/**
 * @description
 */
collector.prototype.terminate = function () {

<<<<<<< HEAD
    console.log("teminated collector");
=======
    logger.info("collector.terminate");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
}



/**
 * @description
 * @param {*} form 
 */
collector.prototype.generate_message = function (api) {

<<<<<<< HEAD
=======
    logger.info("collector.generate_message");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    const method    = "POST";
    const date      = Date.now().toString();
    const url       = process.env.GSS_CLOUD + `/${api}`;
    const accessKey = process.env.API_ACCESS_KEY;

    const payload   = {
        method  : method,
        uri     : url,
        headers : { "x-date" : date, "x-accesskey" : accessKey, "x-signature" : hmac.get_signature(method, date, url)},
<<<<<<< HEAD
        body    : { "Farmid" : 2 },
        json    : true 
    }

    //console.log(payload)

=======
        body    : { "Farmid" : -1 },
        json    : true 
    }

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    return payload;
}



/**
 * @description
 * @param {*} data 
 */
<<<<<<< HEAD
collector.prototype.standardize_data = function (data) {
    
    //console.log("standardize", data["data"]);
    
    // 외부 데이터 받아서 추가하기
    // let outenv = this.openAPI.get_weather("Goyang-si");




    let farmenv = [];

    for (let prop in data[0]) {
        farmenv.push(data[0][prop]);
    }

    console.log(farmenv);
    return farmenv;
=======
collector.prototype.standardize_data = function (farmData) {
    
    logger.info("collector.standardize_data");

    let envData = [];

    for (let prop in farmData[0]) {
        envData.push(farmData[0][prop]);
    }

    //console.log(envData);
    return envData;
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
}



/**
 * @description
 * @param {*} query 
 * @returns 
 */
collector.prototype.get_data = function (options, api) {

    return new Promise((resolve, reject) => {
        
<<<<<<< HEAD
        let payload = this.generate_message(options, api);        

        request(payload, function(error, response, body) {
            if(error)  reject(errorGen(error, "get_data"));
=======
        logger.info("collector.get_data");

        let payload = this.generate_message(options, api);        

        request(payload, function(error, response, body) {

            if(error)  reject(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
            else       resolve(body);
        });    
    })
}




/**
 * @description
 */
module.exports = new collector();
