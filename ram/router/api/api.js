const express       = require("express");
const jwt           = require("jsonwebtoken");
const passport      = require("passport");
const dbm           = require("../../../db/dbm");
const router        = express.Router();
const statusGen     = require("../../statusgenerator");
const {logger}      = require("../../../server/winston");
const runtime       = require("../../../server/runtime");
const time          = require("../api/time");
const check_param   = require("../../checkparma");
const {authority_env_request ,authority_manipulation_request} = require("./authority");



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
        res.send({statusCode : 318, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_env_compare_hour_request" + runtime.end());
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT FARM_ID, DATE, TIME, ${sensorType} FROM ENVHOURAVG WHERE (FARM_ID = '${farmId1}' OR FARM_ID = '${farmId2}') AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 319, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 317, statusMessage : "시간별 비교 데이터 조회 성공", payload : rows});
        logger.info("ram.handle_env_compare_hour_request" + runtime.end());
    }
}




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
        res.send({statusCode : 315, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_env_compare_day_request" + runtime.end());
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT FARM_ID, DATE, ${sensorType} FROM ENVDAYAVG WHERE (FARM_ID = '${farmId1}' OR FARM_ID = '${farmId2}') AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 316, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 314, statusMessage : "일간 비교 데이터 조회 성공", payload : rows});
        logger.info("ram.handle_env_compare_day_request" + runtime.end());
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
        res.send({statusCode : 324, statusMessage : "요청 형식 오류"});
        return;
    }
 
    try {
        if(farmId > 0)  rows = await dbm.select(`SELECT * FROM ENVHOURAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
        else            rows = await dbm.select(`SELECT * FROM ENVHOURAVG WHERE DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 325, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 333, statusMessage : "시간별 평균 비교 데이터 조회 성공", payload : rows});
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
        res.send({statusCode : 321, statusMessage : "요청 형식 오류"});
        return;
    }
 
    try {
        if(farmId > 0)  rows = await dbm.select(`SELECT * FROM ENVDAYAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
        else            rows = await dbm.select(`SELECT * FROM ENVDAYAVG WHERE DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 323, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 320, statusMessage : "일간 평균 데이터 조회 성공", payload : rows});
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
        res.send({statusCode : 327, statusMessage : "요청 형식 오류"});
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT DATE ${sensorType} FROM ENVWEEKAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 328, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 326, statusMessage : "주간 평균 데이터 조회 성공", payload : rows});
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
        res.send({statusCode : 330, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_env_statics_month_request" + runtime.end())
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT DATE ${sensorType} FROM ENVMONTHAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 331, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 329, statusMessage : "월간 평균 데이터 전송 성공", payload : rows});
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
        res.send({statusCode : 333, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_env_request" + runtime.end())
        return;
    }
 
    try {
        if(farmId < 1)   rows = await dbm.select(`SELECT * FROM ENVINFOTABLE ORDER BY DATE DESC, TIME DESC LIMIT 4`);
        else             rows = await dbm.select(`SELECT * FROM ENVINFOTABLE WHERE FARM_ID = '${farmId}' ORDER BY DATE DESC, TIME DESC LIMIT 1`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 334, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 332, statusMessage : "실시간 데이터 전송 성공", payload : rows});
        logger.info("ram.handle_env_request" + runtime.end());
    }
}


/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_env_sts_request(req, res, next) {
    
    let rows   = null;
    let farmId = req.body.farm_id;
    let startDate  = req.body.start_date;
    let endDate    = req.body.end_date;

    runtime.start();
 
    if(!check_param(farmId)) {
        res.send({statusCode : 333, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_env_sts_day_request" + runtime.end())
        return;
    }
 
    try {
        if(farmId > 0)  rows = await dbm.select(`SELECT * FROM ENVDAYSTS WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
        else            rows = await dbm.select(`SELECT * FROM ENVDAYSTS WHERE DATE >= '${startDate}' AND DATE <= '${endDate}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 334, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 332, statusMessage : "실시간 데이터 전송 성공", payload : rows});
        logger.info("ram.handle_env_sts_day_request" + runtime.end());
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
        res.send({statusCode : 336, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_dev_request" + runtime.end())
        return;n
    }

    try {
        rows = await dbm.select(`SELECT * FROM DEVINFOTABLE WHERE FARM_ID = '${farmId}'`);

    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 337, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 335, statusMessage : "장치 데이터 전송 성공", payload : rows});
        logger.info("ram.handle_dev_request" + runtime.end());
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
 
    if(!check_param(farmId, devType, devName, devMaker)) {
        res.send({statusCode : 347, statusMessage : "요청 형식 오류"});
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
        if(!rows)  res.send({statusCode : 348, statusMessage : "DB 변경 실패"});
        else       res.send({statusCode : 346, statusMessage : "장치 추가 조작 성공"});
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
        res.send({statusCode : 350, statusMessage : "요청 형식 오류"});
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
        if(!rows)  res.send({statusCode : 351, statusMessage : "DB 변경 실패"});
        else       res.send({statusCode : 349, statusMessage : "장치 삭제 조작 성공"});
        logger.info("ram.handle_dev_remove_request" + runtime.end());
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
        if(!rows)  res.send({statusCode : 339, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 338, statusMessage : "사용자 데이터 조회 성공", payload : rows});
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
        res.send({statusCode : 341, statusMessage : "요청 형식 오류"});
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
        if(!rows)  res.send({statusCode : 342, statusMessage : "DB 변경 실패"});
        else       res.send({statusCode : 340, statusMessage : "사용자 권한 상승 조작 성공"});
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
        res.send({statusCode : 344, statusMessage : "요청 형식 오류"});
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
        if(!rows)  res.send({statusCode : 345, statusMessage : "DB 변경 실패"});
        else       res.send({statusCode : 344, statusMessage : "사용자 삭제 성공"});
        logger.info("ram.handle_user_remove_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_crop_info_request(req, res, next) {
    
    let farmId = req.body.farm_id;

    runtime.start();

    if(!check_param(farmId)) {
        res.send({statusCode : 353, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_crop_info_request" + runtime.end());
        return;
    }

    try {
        rows = await dbm.select(`SELECT * FROM CROPINFOTABLE WHERE FARM_ID = '${farmId}'`);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 354, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 342, statusMessage : "농작물 데이터 조회 성공", payload : rows});
        logger.info("ram.handle_crop_info_request" + runtime.end());
    }

}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_crop_info_add_request(req, res, next) {
    
    let farmId   = req.body.farm_id;
    let cropType = req.body.crop_type;

    runtime.start();

    if(!check_param(farmId, cropType)) {
        res.send({statusCode : 356, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_crop_info_add_request" + runtime.end());
        return;
    }

    try {
        rows = await dbm.insert(`INSERT INTO CROPINFOTABLE VALUES(?,?)`, [farmId, cropType]);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 357, statusMessage : "DB 변경 실패"});
        else       res.send({statusCode : 355, statusMessage : "농작물 정보 추가 성공"});
        logger.info("ram.handle_crop_info_add_request" + runtime.end());
    }

}




/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_crop_info_remove_request(req, res, next) {
    
    let farmId   = req.body.farm_id;
    let cropType = req.body.crop_type;

    runtime.start();

    if(!check_param(farmId, cropType)) {
        res.send({statusCode : 359, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_crop_info_remove_request" + runtime.end());
        return;
    }

    try {
        rows = await dbm.delete(`DELETE FROM CROPINFOTABLE WHERE FARM_ID = '${farmId}' AND CROP_TYPE = '${cropType}'`);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 360, statusMessage : "DB 변경 실패"});
        else       res.send({statusCode : 358, statusMessage : "농작물 정보 삭제 성공"});
        logger.info("ram.handle_crop_info_remove_request" + runtime.end());
    }

}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_crop_growth_info_request(req, res, next) {
     
    let farmId   = req.body.farm_id;
    let cropType = req.body.crop_type;
    // let sectorId = req.body.sector_id;

    runtime.start();

    if(!check_param(farmId, cropType)) {
        res.send({statusCode : 362, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_crop_growth_info_request" + runtime.end());
        return;
    }

    try {
        rows = await dbm.select(`SELECT * FROM GROWTHINFOTABLE WHERE FARM_ID = '${farmId}' AND CROP_TYPE = '${cropType}'`);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 363, statusMessage : "DB 조회 실패"});
        else       res.send({statusCode : 361, statusMessage : "생육정보 조회 성공", payload : rows});
        logger.info("ram.handle_crop_growth_info_request" + runtime.end());
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_crop_growth_add_request(req, res, next) {
    
    let date            = time();
    let farmId          = req.body.farm_id;
    let cropType        = req.body.crop_type;    
    let sectorId        = req.body.sector_id;
    let cropLeafLong    = req.body.crop_leaf_long;
    let cropLeafCnt     = req.body.crop_leaf_cnt;
    let cropFruitWeight = req.body.crop_fruit_weight;
    let cropFruitWidth  = req.body.crop_fruit_width;
    let cropFruitHeight = req.body.crop_fruit_height;
    let cropFruitSugar  = req.body.crop_fruit_sugar;
    let cropFruitAcid   = req.body.crop_fruit_acid;

    runtime.start();

    if(!check_param(farmId, cropType, sectorId, cropLeafLong, cropLeafCnt, cropFruitWeight, cropFruitWidth, cropFruitHeight, cropFruitSugar, cropFruitAcid)) {
        res.send({statusCode : 365, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_crop_growth_add_request" + runtime.end());
        return;
    }

    try {
        rows = await dbm.insert(`INSERT INTO SECTORINFOTABLE VALUES(?,?)`, farmId,)
        rows = await dbm.insert(`INSERT INTO GROWTHINFOTABLE VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [0 ,date[0], date[1], farmId, cropType, sectorId, cropLeafLong, cropLeafCnt, cropFruitWeight, cropFruitWidth, cropFruitHeight, cropFruitSugar, cropFruitAcid]);
        console.log(rows, date);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 366, statusMessage : "DB 변경 실패"});
        else       res.send({statusCode : 364, statusMessage : "생육정보 추가 성공"});
        logger.info("ram.handle_crop_growth_add_request" + runtime.end());
    }

}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_crop_growth_remove_request(req, res, next) {
    
    let index = req.body.index;

    runtime.start();

    if(!check_param(index)) {
        res.send({statusCode : 368, statusMessage : "요청 형식 오류"});
        logger.info("ram.handle_crop_growth_remove_request" + runtime.end());
        return;
    }

    try {
        rows = await dbm.delete(`DELETE FROM GROWTHINFOTABLE WHERE IDX = '${index}'`);
        console.log(rows);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 369, statusMessage : "DB 변경 실패"});
        else       res.send({statusCode : 367, statusMessage : "생육정보 삭제 성공"});
        logger.info("ram.handle_crop_growth_remove_request" + runtime.end());
    }

}



router.post("/api/env/sts-day", handle_env_sts_request);
router.post("/api/env/compare-hour", authority_env_request, handle_env_compare_hour_request);
router.post("/api/env/compare-day", authority_env_request, handle_env_compare_day_request);
router.post("/api/env/avg-hour", /*authority_env_request,*/ handle_env_avg_hour_request);
router.post("/api/env/avg-day", /*authority_env_request,*/ handle_env_avg_day_request);
router.post("/api/env/avg-week", authority_env_request, handle_env_avg_week_request);
router.post("/api/env/avg-month", authority_env_request, handle_env_avg_month_request);
router.post("/api/env", /*authority_env_request,*/ handle_env_request);
router.post("/api/dev", authority_manipulation_request, handle_dev_request);
router.post("/api/user", authority_manipulation_request, handle_user_request);
router.post("/api/user/promote", authority_manipulation_request, handle_user_promote_request);
router.post("/api/user/remove", authority_manipulation_request, handle_user_remove_request);
router.post("/api/dev/add", authority_manipulation_request, handle_dev_add_request);
router.post("/api/dev/remove", authority_manipulation_request, handle_dev_remove_request);
router.post("/api/cropinfo", authority_manipulation_request, handle_crop_info_request);
router.post("/api/cropinfo/add", authority_manipulation_request, handle_crop_info_add_request);
router.post("/api/cropinfo/remove", authority_manipulation_request, handle_crop_info_remove_request);
router.post("/api/cropgrowth", authority_manipulation_request, handle_crop_growth_info_request);
router.post("/api/cropgrowth/add", authority_manipulation_request, handle_crop_growth_add_request);
router.post("/api/cropgrowth/remove", authority_manipulation_request, handle_crop_growth_remove_request);


module.exports = router;