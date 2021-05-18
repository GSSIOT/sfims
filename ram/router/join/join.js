const express   = require("express");
const router    = express.Router();
const statusGen = require("../../statusgenerator");
const dotenv    = require("dotenv").config({path : "../../../.env"});
const dbm       = require("../../../db/dbm");
<<<<<<< HEAD
=======
const {logger}  = require("../../../server/winston");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f


function json_to_array(json) {

    let ret = [];

    for(let prop in json) {
        ret.push(json[prop]);
    }

    return ret;
}


/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function join(req, res, next) {
<<<<<<< HEAD
    
    let userInfo = req.body.userinfo;
=======

    logger.info("ram.join");

    let userInfo = req.body;
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    let user     = await dbm.find("USERINFOTABLE", "USER_ID", userInfo.user_id);
    let email    = await dbm.find("USERINFOTABLE", "USER_EMAIL", userInfo.user_email);
    let result   = true;
    let statusMessage;

<<<<<<< HEAD
    //console.log(userInfo.id, user);

=======
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    if(user || email) {
        statusMessage  = user  ? "ID IN USE" : "";
        statusMessage += email ? " EMAIL IN USE" : "";
        res.json(statusGen(909, statusMessage));
    }

    else {
<<<<<<< HEAD
        result = await dbm.insert("INSERT INTO USERINFOTABLE VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", json_to_array(userInfo));
=======

        userInfo.user_register   = Date.now();
        userInfo.user_authority  = "user";

        console.log(userInfo)

        result = await dbm.insert("INSERT INTO USERINFOTABLE VALUES (?,?,?,?,?,?,?)", json_to_array(userInfo));
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
        
        if(result)  res.json(statusGen(908, "[JOIN] join success"));
        else        res.json(statusGen(907, "[JOIN] db insert failed"));
    }
}



router.post("/join", join)
module.exports = router;