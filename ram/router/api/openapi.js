const request  = require("request");
const dotenv   = require("dotenv").config({path:"../.env"});
const errorGen = require("../../../error");
const {logger} = require("../../../server/winston");

/**
 * 
 * @param {*} locate 
 * @returns 
 */
function get_weather(locate) {

    return new Promise((resolve, reject) => {
    
        logger.info("ram.get_weather");

        const payload = {
            method : "GET",
            url    : `http://api.openweathermap.org/data/2.5/weather?q=${locate}&appid=${process.env.WEATEHR_API_KEY}`
        };

        request(payload, function(error, response, body) {

            logger.info("ram.get_weather.request");

            if(error)  reject(errorGen(error, "[collect] weather api request error"));
            else       resolve(JSON.parse(body));
        }); 
    });
}


module.exports = {get_weather : get_weather};