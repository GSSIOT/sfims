const express       = require("express");
const jwt           = require("jsonwebtoken");
const passport      = require("passport");
const dbm           = require("../../../db/dbm");
const router        = express.Router();
const statusGen     = require("../../statusgenerator");
const {logger}      = require("../../../server/winston");
const farmData      = require("../../../farmdata");
const runtime       = require("../../../runtime");
const { ConsoleTransportOptions } = require("winston/lib/winston/transports");



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_env_compare_day_request(req, res, next) {
    
    let rows       = null;
    let farmId1    = req.body.farm_id_1;
    let farmId2    = req.body.farm_id_2;
    let startDate  = req.body.start_date;
    let endDate    = req.body.end_date;
    let sensorType = req.body.sensor_type;

    runtime.start();

    if(!farmId1 || farmId2 || !sensorType || !startDate || !endDate) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        logger.info("ram.handle_env_compare_day_request" + runtime.end());
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT FARM_ID, DATE, TIME ,${sensorType} FROM ENVDAYAVG WHERE FARM_ID = '${farmId1}' OR FARM_ID = '${farmId2}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
        console.log(row);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows});
        logger.info("ram.handle_env_compare_day_request" + runtime.end());
    }
}


/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_env_compare_hour_request(req, res, next) {
    
    let rows       = null;
    let farmId1    = req.body.farm_id_1;
    let farmId2    = req.body.farm_id_2;
    let startDate  = req.body.start_date;
    let endDate    = req.body.end_date;
    let sensorType = req.body.sensor_type;

    runtime.start();

    if(!farmId1 || !farmId2 || !sensorType || !startDate || !endDate) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        logger.info("ram.handle_env_compare_hour_request" + runtime.end());
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT FARM_ID, DATE, TIME, ${sensorType} FROM ENVHOURAVG WHERE FARM_ID = '${farmId1}' OR FARM_ID = '${farmId2}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows});
        logger.info("ram.handle_env_compare_hour_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_env_avg_hour_request(req, res, next) {
    
    let rows       = null;
    let farmId     = req.body.farm_id;
    let startDate  = req.body.start_date;
    let endDate    = req.body.end_date;

    runtime.start();

    if(!farmId || !startDate || !endDate) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT DATE, ${sensorType} FROM ENVHOURAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows});
        logger.info("ram.handle_env_avg_hour_request" + runtime.end());
    }
}


/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_env_avg_day_request(req, res, next) {
    
    let rows       = null;
    let farmId     = req.body.farm_id;
    let startDate  = req.body.start_date;
    let endDate    = req.body.end_date;
    let sensorType = req.body.sensor_type;

    runtime.start();

    if(!farmId || !startDate || !endDate) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT DATE, ${sensorType} FROM ENVDAYAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows});
        logger.info("ram.handle_env_avg_day_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_env_avg_week_request(req, res, next) {
    
    let rows       = null;
    let farmId     = req.body.farm_id;
    let startDate  = req.body.start_date;
    let endDate    = req.body.end_date;

    runtime.start();

    if(!farmId || !startDate || !endDate) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT DATE, ${sensorType} FROM ENVDAYAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows});
        logger.info("ram.handld_env_avg_week_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_env_avg_month_request(req, res, next) {
    
    let rows       = null;
    let farmId     = req.body.farm_id;
    let startDate  = req.body.start_date;
    let endDate    = req.body.end_date;

    runtime.start();

    if(!farmId || !startDate || !endDate) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        logger.info("ram.handle_env_statics_month_request" + runtime.end())
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT DATE, ${sensorType} FROM ENVDAYAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows});
        logger.info("ram.handle_env_statics_month_request" + runtime.end());
    }
}




/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handle_env_request(req, res, next) {
    
    let rows   = null;
    let farmId = req.body.farm_id;

    runtime.start();
 
    try {
        rows = await dbm.select(`SELECT * FROM ENVINFOTABLE WHERE FARM_ID = '${farmId}' ORDER BY TIME DESC LIMIT 1`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows});
        logger.info("ram.handle_env_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handle_dev_request(req, res, next) {
    
    let rows   = null;
    let farmId = req.body.farm_id;

    runtime.start();
 
    try {
        rows = await dbm.select(`SELECT * FROM DEVINFOTABLE WHERE FARM_ID = '${farmId}' ORDER BY DESC TIME LIMIT 1`);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows[0]});
        logger.info("ram.handle_dev_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handle_user_request(req, res, next) {

    let rows   = null;
    let userId = req.body.user_id;

    runtime.start();
 
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
        logger.info("ram.handle_user_request" + runtime.end());
    }
}




router.post("/api/env/compare-hour", handle_env_compare_hour_request);
router.post("/api/env/compare-day", handle_env_compare_day_request);
router.post("/api/env/avg-hour", handle_env_avg_hour_request);
router.post("/api/env/avg-day", handle_env_avg_day_request);
router.post("/api/env/avg-week", handle_env_avg_week_request);
router.post("/api/env/avg-month", handle_env_avg_month_request);
router.post("/api/env", handle_env_request);
router.post("/api/dev", handle_dev_request);
router.post("/api/user", handle_user_request);



module.exports = router;