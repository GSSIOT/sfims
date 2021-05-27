const express       = require("express");
const jwt           = require("jsonwebtoken");
const passport      = require("passport");
const dbm           = require("../../../db/dbm");
const router        = express.Router();
const statusGen     = require("../../statusgenerator");
const {logger}      = require("../../../server/winston");
const runtime       = require("../../../server/runtime");
const check_param   = require("../../checkparma");
const {authority_env_request ,authority_manipulation_request} = require("./authority");



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

    console.log(req.body);

    if(!check_param(farmId1, farmId2, sensorType, startDate, endDate)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패!!!!"});
        logger.info("ram.handle_env_compare_day_request" + runtime.end());
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT FARM_ID, DATE, TIME ,${sensorType} FROM ENVDAYAVG WHERE (FARM_ID = '${farmId1}' OR FARM_ID = '${farmId2}') AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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

    if(!check_param(farmId1, farmId2, sensorType, startDate, endDate)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        logger.info("ram.handle_env_compare_hour_request" + runtime.end());
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT FARM_ID, DATE, TIME, ${sensorType} FROM ENVHOURAVG WHERE (FARM_ID = '${farmId1}' OR FARM_ID = '${farmId2}') AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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

    if(!check_param(farmId, startDate, endDate)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT * FROM ENVHOURAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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

    runtime.start();

    if(!check_param(farmId, startDate, endDate)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT * FROM ENVDAYAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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

    if(!check_param(farmId, startDate, endDate)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT DATE, TIME, ${sensorType} FROM ENVWEEKAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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

    if(!check_param(farmId, startDate, endDate)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        logger.info("ram.handle_env_statics_month_request" + runtime.end())
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT DATE, TIME, ${sensorType} FROM ENVMONTHAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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
 
    if(!check_param(farmId)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        logger.info("ram.handle_env_request" + runtime.end())
        return;
    }
 
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
 
    if(!check_param(farmId)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        logger.info("ram.handle_dev_request" + runtime.end())
        return;
    }

    try {
        rows = await dbm.select(`SELECT * FROM DEVINFOTABLE WHERE FARM_ID = '${farmId}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows});
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
    
    runtime.start();
 
    try {
        rows = await dbm.select(`SELECT * FROM USERINFOTABLE`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공", payload : rows});
        logger.info("ram.handle_user_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_user_promote_request(req, res, next) {

    let userId = req.body.user_id;

    runtime.start();
 
    if(!check_param(userId)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        logger.info("ram.handle_user_promote_request" + runtime.end())
        return;
    }

    try {
        rows = await dbm.update(`UPDATE USERINFOTABLE SET USER_AUTHORITY = "admin" WHERE USER_ID = '${userId}'`);
        console.log(rows[0]);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공"});
        logger.info("ram.handle_user_promote_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_user_remove_request(req, res, next) {
   
    let userId = req.body.user_id;

    runtime.start();
 
    if(!check_param(userId)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        logger.info("ram.handle_user_remove_request" + runtime.end())
        return;
    }

    try {
        rows = await dbm.delete(`DELETE FROM USERINFOTABLE WHERE USER_ID = '${userId}'`);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 전송 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 전송 성공"});
        logger.info("ram.handle_user_remove_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_dev_add_request(req, res, next) {
    
    let rows      = null;
    let farmId    = req.body.farm_id;
    let devType   = req.body.dev_type;
    let devName   = req.body.dev_name;
    let devMaker  = req.body.dev_maker;

    runtime.start();
 
    if(!check_param(farmId, farmId, devType, devName, devMaker)) {
        res.send({statusCode : 301, statusMessage : "요청 파라미터 잘못됨"});
        logger.info("ram.handle_dev_add_request" + runtime.end())
        return;
    }

    try {
        rows = await dbm.insert(`INSERT INTO DEVINFOTABLE VALUES(?,?,?,?,?)`, [0, farmId, devType, devName, devMaker]);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 입력 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 입력 성공"});
        logger.info("ram.handle_dev_add_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_dev_remove_request(req, res, next) {
    
    let devId = req.body.dev_id;

    runtime.start();

    if(!check_param(devId)) {
        res.send({statusCode : 301, statusMessage : "요청 파라미터 잘못됨"});
        logger.info("ram.handle_dev_remove_request" + runtime.end());
        return;
    }

    try {
        rows = await dbm.delete(`DELETE FROM DEVINFOTABLE WHERE DEV_ID = '${devId}'`);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 300, statusMessage : "데이터 삭제 실패"});
        else       res.send({statusCode : 301, statusMessage : "데이터 삭제 성공"});
        logger.info("ram.handle_dev_remove_request" + runtime.end());
    }

}



router.post("/api/env/compare-hour", authority_env_request, handle_env_compare_hour_request);
router.post("/api/env/compare-day", authority_env_request, handle_env_compare_day_request);
router.post("/api/env/avg-hour", /*authority_env_request,*/ handle_env_avg_hour_request);
router.post("/api/env/avg-day", /*authority_env_request,*/ handle_env_avg_day_request);
router.post("/api/env/avg-week", authority_env_request, handle_env_avg_week_request);
router.post("/api/env/avg-month", authority_env_request, handle_env_avg_month_request);
router.post("/api/env", authority_env_request, handle_env_request);
router.post("/api/dev", authority_manipulation_request, handle_dev_request);
router.post("/api/user", authority_manipulation_request, handle_user_request);
router.post("/api/user/promote", authority_manipulation_request, handle_user_promote_request);
router.post("/api/user/remove", authority_manipulation_request, handle_user_remove_request);
router.post("/api/dev/add", authority_manipulation_request, handle_dev_add_request);
router.post("/api/dev/remove", authority_manipulation_request, handle_dev_remove_request);



module.exports = router;