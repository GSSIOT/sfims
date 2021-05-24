const {logger}    = require("../../../server/winston");
const statusGen   = require("../../statusgenerator");
const dbm         = require("../../../db/dbm");
const runtime     = require("../../../runtime");
const check_param = require("../../checkparma");



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



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function authority_user_request(req, res, next) {

    
    
}



module.exports = authority_env_request
