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
    passport.authenticate("jwt", {session : false}, async function(error, user, info) {

        let authority = false;
        let farmId    = req.body.farm_id   || null;
        let farmId1   = req.body.farm_id_1 || null;
        let farmId2   = req.body.farm_id_2 || null;

        runtime.start();
        
        console.log(farmId, farmId1, farmId2, !check_param(farmId));

        if(error) {
            res.json(statusGen(302, "서버 오류"));
            return;
        }    

        if(!user) {
            res.json(statusGen(303, "비인증 토큰"));
            return;
        }

        if(req.url.indexOf("compare") < 0) {
            try {
                if(check_param(farmId)) {
                    authority = await dbm.check_user_authority(user["USER_ID"], farmId);
                }
                else {
                    res.json(statusGen(304, "요청 형식 오류"));
                    logger.info("ram.handle_authority_request" + runtime.end());
                    return;
                }
            }
            catch(error) {
                logger.error(error);
            }
            finally {
                if(authority)  next();
                else           res.send(statusGen(305, "권한 없음"));
                logger.info("ram.handle_authority_request" + runtime.end());
            }
        }
    
        else {
            try {
                if(check_param(farmId1, farmId2)) {
                    authority = await dbm.check_user_authority(user["USER_ID"], farmId1) & await dbm.check_user_authority(user["USER_ID"], farmId2);
                }
                else {
                    res.json(statusGen(304, "요청 형식 오류"));
                    logger.info("ram.handle._authority_request" + runtime.end());
                    return;
                }
            }
            catch(error) {
                logger.error(error);
            }
            finally {
                if(authority)  next();
                else           res.send(statusGen(305, "권한 없음"));
                logger.info("ram.handle_authority_request" + runtime.end());
            }
        }

        logger.info("ram.authority_manipulation_request" + runtime.end());
    })(req, res, next)  
}



async function authority_manipulation_request(req, res, next) {

    passport.authenticate("jwt", {session : false}, async function(error, user, info) {
        
        runtime.start();
        
        if(error) {
            res.json(statusGen(307  , "서버 오류"));
            return;
        }    

        if(!user) {
            res.json(statusGen(308, "비인증 토큰"));
            return;
        }

        if(user["USER_AUTHORITY"] == "admin") {
            next();
        }   

        else {
            res.send({statusCode : 309, statusMessage : "권한 없음"});
        }

        logger.info("ram.authority_manipulation_request" + runtime.end());
    })(req, res, next);
}



module.exports = {authority_env_request, authority_manipulation_request}
