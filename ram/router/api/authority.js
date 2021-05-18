<<<<<<< HEAD
const dbm       = require("../../../db/dbm");
const statusGen = require("../../statusgenerator");


async function authority_check(req, res, next) {

    console.log("at chec");
=======
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
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

    let authority = false;
    let userId    = req.body.user_id;
    let farmId    = req.body.farm_id;

    try {
        if(farmId || userId) {
            authority = await dbm.check_user_authoriy(userId, farmId);
        }
    }
    catch(error) {
<<<<<<< HEAD
        console.log(error);
    }
    finally {
        console.log("authority : ", authority);
        if(authority)  next();
        else           res.send(statusGen(208, "권한 없음"));
    }
}


module.exports = authority_check;
=======
        logger.error(error);
    }
    finally {
        if(authority)  next();
        else           res.send(statusGen(500, "권한 없음"));
    }
}

module.exports = handle_authority_request;
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
