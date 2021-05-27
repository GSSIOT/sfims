const {logger}    = require("../../../server/winston");
const statusGen   = require("../../statusgenerator");
const dbm         = require("../../../db/dbm");
const runtime     = require("../../../server/runtime");
const check_param = require("../../checkparma");
const express     = require("express");
const passport    = require("passport");



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function authority_env_request(req, res, next) {

    let authority = true;
    let userId    = req.body.user_id;
    let farmId    = req.body.farm_id   || null;
    let farmId1   = req.body.farm_id_1 || null;
    let farmId2   = req.body.farm_id_2 || null;

    runtime.start();

    if(req.url.indexOf("compare") < 0) {
        try {
            if(!check_param(userId, farmId)) {
                authority = await dbm.check_user_authority(userId, farmId);
            }
        }
        catch(error) {
            logger.error(error);
        }
        finally {
            if(authority)  next();
            else           res.send(statusGen(500, "권한 없음"));
            logger.info("ram.handle_authority_request" + runtime.end());
        }
    }

    else {
        try {
            if(!check_param(farmId1, farmId2 , userId)) {
                authority &= await dbm.check_user_authority(userId, farmId1);
                authority &= await dbm.check_user_authority(userId, farmId2);
            }
        }
        catch(error) {
            logger.error(error);
        }
        finally {
            if(authority)  next();
            else           res.send(statusGen(500, "권한 없음"));
            logger.info("ram.handle_authority_request" + runtime.end());
        }
    }
}



async function authority_manipulation_request(req, res, next) {

    passport.authenticate("jwt", {session : false}, async function(error, user, info) {
        
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
            next();
        }   

        else {
            res.send({statusCode : 000, statusMessage : "권한 없음"});
        }

        logger.info("ram.authority_manipulation_request" + runtime.end());
    })(req, res, next);
}



module.exports = {authority_env_request, authority_manipulation_request}
