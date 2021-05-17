const express       = require("express");
const jwt           = require("jsonwebtoken");
const passport      = require("passport");
const dbm           = require("../../../db/dbm");
const router        = express.Router();
const statusGen     = require("../../statusgenerator");
const openAPI       = require("./openapi");
const logger        = require("../../../server/winston");



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handleEnvRequest(req, res, next) {
    
    logger.info("ram.handle_env_request");

    let rows   = null;
    let farmId = req.body.farm_id;
 
    try {
        rows = await dbm.select(`SELECT * FROM ENVINFOTABLE WHERE FARM_ID = '${farmId}' ORDER BY TIME LIMIT 1`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows});
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handleDevRequest(req, res, next) {
    
    logger.info("ram.handle_dev_request");

    let rows   = null;
    let farmId = req.body.farm_id;
 
    try {
        rows = await dbm.select(`SELECT * FROM DEVINFOTABLE WHERE FARM_ID = '${farmId}' ORDER BY TIME LIMIT 1`);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows[0]});
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handleUserRequest(req, res, next) {

    logger.info("ram.handle_user_request");

    let rows   = null;
    let userId = req.body.user_id;
 
    try {
        rows = await dbm.select(`SELECT * FROM DEVINFOTABLE WHERE USER_ID = '${USER_ID}'`);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows[0]});
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handle_authority_request(req, res, next) {

    logger.info("handle_authority_request");

    let authority = false;
    let userId    = req.body.user_id;
    let farmId    = req.body.farm_id;

    try {
        if(farmId || userId) {
            authority = await dbm.check_user_authoriy(userId, farmId);
        }
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(authority)  next();
        else           res.send(statusGen(500, "권한 없음"));
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_weather_request(req, res, next) {
    
    logger.info("handle_weather_request");

    let weather = null;
 
    try {
        weather = await openAPI.get_weather("Goyang-si");
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!weather)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else          res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : weather});
    }
}


router.post("/api/weather", handle_weather_request);
router.post("/api/authority", handle_authority_request);
router.post("/api/env", handleEnvRequest);
router.post("/api/dev", handleDevRequest);
router.post("/api/user", handleUserRequest);
module.exports = router;