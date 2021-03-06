const request  = require("request");
const dotenv   = require("dotenv").config({path:"../.env"});
const errorGen = require("../../../server/error");
const {logger} = require("../../../server/winston");
const express  = require("express");
const runtime  = require("../../../server/runtime");
const check_param = require("../../checkparma");
const router   = express.Router();
const moment   = require("moment");
const convert  = require("fast-xml-parser");
const dbm = require("../../../db/dbm");


/**
 * 
 * @param {*} locate 
 * @returns 
 */
function get_market_price(date, cropCode, marketCode) {

    return new Promise((resolve, reject) => {

        runtime.start();

        const payload = {
            method : "GET",
            url    : `http://apis.data.go.kr/B552895/openapi/service/OrgPriceAuctionService/getExactProdPriceList?ServiceKey=LNLv6e%2FGhYc%2FM%2BwDKczMWirQWySCwbStck9NMGCxwN0TFHaXlM%2FdsXSeA5nN2hE6gQV25t9uIsYz%2BhhyKm6zsg%3D%3D&&pageNo=1&numOfRows=1&delngDe=${date}&prdlstCd=${cropCode}&whsalCd=${marketCode}`
        };

        request(payload, function(error, response, body) {

            let returnValue = null;

            try{
                returnValue = convert.parse(body).response.body.items.item;
            }

            catch(err) {
                logger.error("ram.get_market_price.request" + error);
            }

            finally {
                if(error)  reject(errorGen(error, "[collect] market-price api request error"));
                else       resolve(returnValue);
                logger.info("ram.get_market_price.request");
            }
        }); 

        logger.info("ram.get_market_price" + runtime.end());
    });
}


// 마켓 코드, 작물 코드 보내줌
async function handle_get_market_price_info_request(req, res, next) {

    let resultCrop   = null;
    let resultMarket = null;

    try {
        resultCrop   = await dbm.get_market_price_crop_code_info();
        resultMarket = await dbm.get_market_price_market_code_info();
    }
    catch(error) {
        console.log(error);
    }
    finally {
        if(resultCrop && resultMarket)  res.send({ statusCode : 373, statusMessage : "경락 시세 정보 조회 성공", payload : {resultMarket, resultCrop} });
        else                            res.send({ statusCode : 374, statusMessage : "경락 시세 정보 조회 실패"});
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_market_price_request(req, res, next) {

    let cropCode   = req.body.crop_code;
    let marketCode = req.body.market_code;
    let date       = moment().add(-1, 'days').format('YYYYMMDD');
    let result     = null;
    
    runtime.start();

    if (!check_param(cropCode, marketCode)) {
        logger.info("handle_market_price_request" + runtime.end());
        res.send({ statusCode : 371, statusMessage : "요청 형식 오류"})
    }

    try {
        if(moment().day() == 0)  date = moment().add(-2, 'days').format('YYYYMMDD');
        if(moment().day() == 1)  date = moment().add(-3, 'days').format('YYYYMMDD');
        result = await get_market_price(date, cropCode, marketCode);
    }
    catch (error) {
        logger.error(error);
    }
    finally {
        if (!result) res.send({ statusCode: 372, statusMessage: "경락 시세 조회 실패" });
        else res.send({ statusCode: 370, statusMessage: "경락 시세 조회 성공", payload: result });
        logger.info("handle_handle_market_price_request" + runtime.end());
    }

}


router.post("/market-price/info", handle_get_market_price_info_request);
router.post("/market-price/price", handle_market_price_request);
module.exports = router