const dbm       = require("../../../db/dbm");
const statusGen = require("../../statusgenerator");


async function authority_check(req, res, next) {

    console.log("at chec");

    let authority = false;
    let userId    = req.body.user_id;
    let farmId    = req.body.farm_id;

    try {
        if(farmId || userId) {
            authority = await dbm.check_user_authoriy(userId, farmId);
        }
    }
    catch(error) {
        console.log(error);
    }
    finally {
        console.log("authority : ", authority);
        if(authority)  next();
        else           res.send(statusGen(208, "권한 없음"));
    }
}


module.exports = authority_check;