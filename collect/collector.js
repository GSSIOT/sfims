const request  = require("request");
const bcrypt   = require("./bcrypt");
const hmac     = require("./hmac");
const dbm      = require("../db/dbm");
const dotenv   = require("dotenv").config({path : "../.env"});
const errorGen = require("../error");
const openAPI  = require("./openapi");



/**
 * @description
 */
function collector() {
    this.dbm     = null;
    this.bcrypt  = null;
    this.request = null;
    this.hmac    = null;
    this.openAPI = null;
}



/**
 * @description
 * @param {*} dbm 
 */
collector.prototype.init = function () {

    this.dbm     = dbm;
    this.bcrypt  = bcrypt;
    this.hmac    = hmac;
    this.openAPI = openAPI;

    if(!this.dbm || !this.bcrypt || !this.hmac || !this.openAPI)  return false;

    console.log("collector init");
    return true;
}



/**
 * @description
 */
 collector.prototype.collect = async function () {

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
        body    : { "Farmid" : 2 },
        json    : true 
    }

    //console.log(payload)

    return payload;
}



/**
 * @description
 * @param {*} data 
 */
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
