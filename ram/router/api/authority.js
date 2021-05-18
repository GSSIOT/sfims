const {logger}  = require("../../../server/winston");
const statusGen = require("../../statusgenerator");
const dbm       = require("../../../db/dbm");


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

module.exports = handle_authority_request;
