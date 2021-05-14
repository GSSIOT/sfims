const express       = require("express");
const jwt           = require("jsonwebtoken");
const passport      = require("passport");
const dbm           = require("../../../db/dbm");
const router        = express.Router();
const statusGen     = require("../../statusgenerator");




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
        console.log(rows);
    }
    catch(error) {
        console.log(error);
    }
    finally {
        if(!rows)  res.send({statusCode : 123, statusMessage : "조회 실패"});
        else       res.send({statusCode : 125, statusMessage : "조회 성공", payload : rows[0]});
    }
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function handleDevRequest(req, res, next) {
    console.log("dev");
    res.send({
        statusCode : 332,
        tatusMessage : "dev data"
    });
}



/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function handleUserRequest(req, res, next) {
    console.log("user");
    res.send({
        statusCode : 335,
        statusMessage : "user data"
    });
}



router.post("/api/env", handleEnvRequest);
router.post("/api/dev", handleDevRequest);
router.post("/api/user", handleUserRequest);
module.exports = router;