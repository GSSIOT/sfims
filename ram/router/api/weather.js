const express       = require("express");
const jwt           = require("jsonwebtoken");
const passport      = require("passport");
const dbm           = require("../../../db/dbm");
const router        = express.Router();
const statusGen     = require("../../statusgenerator");
const openAPI       = require("./openapi");



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handle_weather_request(req, res, next) {
    
    let weather = null;
 
    try {
        weather = await openAPI.get_weather("Goyang-si");
        console.log(weather);
    }
    catch(error) {
        console.log(error);
    }
    finally {
        if(!weather)  res.send({statusCode : 300, statusMessage : "데이터 전송 성공"});
        else          res.send({statusCode : 301, statusMessage : "데이터 전송 실패", payload : weather[0]});
    }
}




router.post("/api/weather", handle_weather_request);
module.exports = router;