const {logger}  = require("../../../server/winston");
const statusGen = require("../../statusgenerator");
const dbm       = require("../../../db/dbm");
const runtime   = require("../../../runtime");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_authority_request(req, res, next) {

    let authority = false;
    let userId    = req.body.user_id;
    let farmId    = req.body.farm_id;

    runtime.start();

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
        logger.info("ram.handle_authority_request" + runtime.end());
    }
}

module.exports = handle_authority_request;
