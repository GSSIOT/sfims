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
async function handleEnvRequest(req, res, next) {
    
    let rows   = null;
    let farmId = req.body.farm_id;
 
    try {
        rows = await dbm.select(`SELECT * FROM ENVINFOTABLE WHERE FARM_ID = '${farmId}' ORDER BY TIME LIMIT 1`);
    }
    catch(error) {
        console.log(error);
    }
    finally {
        console.log(rows);
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 성공"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 실패", payload : rows});
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handleDevRequest(req, res, next) {
    
    let rows   = null;
    let farmId = req.body.farm_id;
 
    try {
        rows = await dbm.select(`SELECT * FROM DEVINFOTABLE WHERE FARM_ID = '${farmId}' ORDER BY TIME LIMIT 1`);
        console.log(rows);
    }
    catch(error) {
        console.log(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 성공"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 실패", payload : rows[0]});
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handleUserRequest(req, res, next) {

    let rows   = null;
    let userId = req.body.user_id;
 
    try {
        rows = await dbm.select(`SELECT * FROM DEVINFOTABLE WHERE USER_ID = '${USER_ID}'`);
        console.log(rows);
    }
    catch(error) {
        console.log(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 성공"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 실패", payload : rows[0]});
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handle_authority_request(req, res, next) {

    console.log("at chec");

    let authority = false;
    let userId    = req.body.user_id;
    let farmId    = req.body.farm_id;

    try {
        if(farmId || userId) {
            authority = await dbm.check_user_authoriy(userId, farmId);
        }
    }
    catch(error) {
        console.log(error);
    }
    finally {
        console.log("authority : ", authority);
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
    
    let weather = null;
 
    try {
        weather = await openAPI.get_weather("Goyang-si");
    }
    catch(error) {
        console.log(error);
    }
    finally {
        console.log(weather);
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