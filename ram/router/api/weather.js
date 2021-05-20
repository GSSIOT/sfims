const request  = require("request");
const dotenv   = require("dotenv").config({path:"../.env"});
const errorGen = require("../../../error");
const {logger} = require("../../../server/winston");
const express  = require("express");
const runtime  = require("../../../runtime");
const router   = express.Router();



/**
 * 
 * @param {*} locate 
 * @returns 
 */
function get_weather(locate) {

    return new Promise((resolve, reject) => {

        runtime.start();

        const payload = {
            method : "GET",
            url    : `http://api.openweathermap.org/data/2.5/weather?q=${locate}&appid=${process.env.WEATEHR_API_KEY}`
        };

        request(payload, function(error, response, body) {
            logger.info("ram.get_weather.request");
            if(error)  reject(errorGen(error, "[collect] weather api request error"));
            else       resolve(JSON.parse(body));
        }); 

        logger.info("ram.get_weather" + runtime.end());
    });
}



/**
 * 
 * @param {*} locate 
 * @returns 
 */
 function get_weather_week(locate) {

    return new Promise((resolve, reject) => {

        runtime.start();

        const payload = {
            method : "GET",
            url    : `http://api.openweathermap.org/data/2.5/onecall?lat=37.658189026137904&lon=126.87198627389228&exclude=minutely,hourly,current,alert&units=metric&appid=${process.env.WEATEHR_API_KEY}`
        };

        request(payload, function(error, response, body) {
            logger.info("ram.get_weather.request");
            if(error)  reject(errorGen(error, "[collect] weather api request error"));
            else       resolve(JSON.parse(body));
        }); 

        logger.info("ram.get_weather" + runtime.end());
    });
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_weather_day_request(req, res, next) {
    
    let weather = null;
 
    runtime.start();

     try {
         weather = await get_weather("Goyang-si");
     }
     catch (error) {
         logger.error(error);
     }
     finally {
         if (!weather) res.send({ statusCode: 300, statusMessage: "데이터 전송 실패" });
         else res.send({ statusCode: 301, statusMessage: "데이터 전송 성공", payload: weather });
         logger.info("handle_weather_request" + runtime.end());
     }
   
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_weather_week_request(req, res, next) {
    
    let weather = null;
 
    runtime.start();

     try {
         weather = await get_weather_week("Goyang-si");
     }
     catch (error) {
         logger.error(error);
     }
     finally {
         if (!weather) res.send({ statusCode: 300, statusMessage: "데이터 전송 실패" });
         else res.send({ statusCode: 301, statusMessage: "데이터 전송 성공", payload: weather });
         logger.info("handle_weather_request" + runtime.end());
     }
}



router.post("/weather/day", handle_weather_day_request);
router.post("/weather/week", handle_weather_week_request)
module.exports = router