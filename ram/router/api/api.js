const express       = require("express");
const jwt           = require("jsonwebtoken");
const passport      = require("passport");
const dbm           = require("../../../db/dbm");
const router        = express.Router();
const statusGen     = require("../../statusgenerator");
const {logger}      = require("../../../server/winston");
const farmData      = require("../../../farmdata");
const runtime       = require("../../../runtime");
const check_param   = require("../../checkparma")



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
        rows = await dbm.select(`SELECT FARM_ID, DATE, TIME ,${sensorType} FROM ENVDAYAVG WHERE FARM_ID = '${farmId1}' OR FARM_ID = '${farmId2}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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
    let sensorType = req.body.sensor_type;

    runtime.start();

    if(!check_param(farmId, startDate, endDate, sensorType)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT DATE, TIME, ${sensorType} FROM ENVHOURAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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

    if(!check_param(farmId, startDate, endDate, sensorType)) {
        res.send({statusCode : 301, statusMessage : "데이터 전송 실패"});
        return;
    }
 
    try {
        rows = await dbm.select(`SELECT DATE, TIME, ${sensorType} FROM ENVDAYAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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
        rows = await dbm.select(`SELECT DATE, TIME, ${sensorType} FROM ENVDAYAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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
        rows = await dbm.select(`SELECT DATE, TIME, ${sensorType} FROM ENVDAYAVG WHERE FARM_ID = '${farmId}' AND DATE >= '${startDate}' AND DATE <= '${endDate}'`);
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
    
    runtime.start();

    passport.authenticate("jwt", {session : false}, async function(error, user, info) {
        
        let rows = null;
        
        if(error) {
            res.json(statusGen(0  , "server error"));
            return;
        }

        if(!user) {
            res.json(statusGen(201, "authentication failed"));
            return;
        }  
        
        if(user["USER_AUTHORITY"] == "admin") {
            try {
                rows = await dbm.select("SELECT USER_ID, USER_NAME, USER_EMAIL, USER_PHONE, USER_AUTHORITY FROM USERINFOTABLE");
            }
            catch(error) {
                logger.error(error)
            }
            finally {
                if(!rows)  res.send({statusCode : 000, statusMessage : "데이터 전송 실패"});
                else       res.send({statusCode : 001, statusMessage : "데이터 전송 성공", payload : rows})
                logger.info("ram.handle_user_request" + runtime.end());
            }
        }   

        else {
            res.send({statusCode : 000, statusMessage : "권한 없음"});
        }
        logger.info("ram.handle_user_request" + runtime.end());
    })(req, res, next);
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_user_update_request(req, res, next) {

    let userId        = req.body.user_id || null;
    let userAuthority = req.body.user_authority || null;

    runtime.start();

    if(!check_param(userId, userAuthority)) {
        res.send({statusCode : 000, statusMessage : "변경 실패"});
        logger.info("ram.handle_user_update_request" + runtime.end());
        return;
    } 

    passport.authenticate("jwt", {session : false}, async function(error, user, info) {
        
        let rows = null;
        
        if(error) {
            res.json(statusGen(0  , "server error"));   
            return;
        }

        if(!user) {
            res.json(statusGen(201, "authentication failed"));
            return;
        }
        
        if(user["USER_AUTHORITY"] == "admin") {
            try {
                    console.log(userAuthority)
                    rows = await dbm.update(`UPDATE USERINFOTABLE SET USER_AUTHORITY = '${userAuthority}' WHERE USER_ID = ${userId}`);
                    
                }
            catch(error) {
                logger.error(error)
            }
            finally {
                if(!rows)  res.send({statusCode : 000, statusMessage : "변경 실패"});
                else       res.send({statusCode : 001, statusMessage : "변경 성공"});
                logger.info("ram.handle_user_update_request" + runtime.end());
            }
        }   

        else {
            res.send({statusCode : 000, statusMessage : "권한 없음"});
        }

        logger.info("ram.handle_user_update_request" + runtime.end());
    })(req, res, next);
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_user_remove_request(req, res, next) {
    passport.authenticate("jwt", {session : false}, async function(error, user, info) {
        
        let rows = null;
        runtime.start();
        
        if(error) {
            res.json(statusGen(0  , "server error"));
            return;
        }    

        if(!user) {
            res.json(statusGen(201, "authentication failed"));
            return;
        }

        if(user["USER_AUTHORITY"] == "admin") {
            try {
                rows = await dbm.select("SELECT USER_ID, USER_NAME, USER_EMAIL, USER_PHONE, USER_AUTHORITY FROM USERINFOTABLE");
            }
            catch(error) {
                logger.error(error)
            }
            finally {
                if(!rows)  res.send({statusCode : 000, statusMessage : "데이터 전송 실패"});
                else       res.send({statusCode : 001, statusMessage : "데이터 전송 성공", payload : rows[0]})
                logger.info("ram.handle_user_request" + runtime.end());
            }
        }   

        else {
            res.send({statusCode : 000, statusMessage : "권한 없음"});
        }

        logger.info("ram.handle_user_request" + runtime.end());
    })(req, res, next);
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
router.post("/api/user/update", handle_user_update_request);
router.post("/api/user/remove", handle_user_remove_request);



module.exports = router;