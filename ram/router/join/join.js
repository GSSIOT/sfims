const express   = require("express");
const router      = express.Router();
const statusGen   = require("../../statusgenerator");
const dotenv      = require("dotenv").config({path : "../../../.env"});
const dbm         = require("../../../db/dbm");
const {logger}    = require("../../../server/winston");
const runtime     = require("../../../server/runtime");
const check_param = require("../../checkparma");

function json_to_array(json) {

    console.log(json);
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

    let userInfo = req.body;
    let user     = await dbm.find("USERINFOTABLE", "USER_ID", userInfo.user_id);
    let email    = await dbm.find("USERINFOTABLE", "USER_EMAIL", userInfo.user_email);
    let result   = true;
    let statusMessage;

    runtime.start();

    if(check_param(email, result)) {
        statusMessage  = user  ? "ID IN USE" : "";
        statusMessage += email ? " EMAIL IN USE" : "";
        res.json(statusGen(909, statusMessage));
        logger.info("ram.join" + runtime.end());
    }

    else {

        userInfo.user_register   = Date.now();
        userInfo.user_authority  = "user";

        result = await dbm.insert("INSERT INTO USERINFOTABLE VALUES (?,?,?,?,?,?,?)", json_to_array(userInfo));
        
        if(result)  res.json(statusGen(908, "[JOIN] join success"));
        else        res.json(statusGen(907, "[JOIN] db insert failed"));
        logger.info("ram.join" + runtime.end());
    }
}



router.post("/join", join)
module.exports = router;