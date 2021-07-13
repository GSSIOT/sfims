const express   = require("express");
const router      = express.Router();
const statusGen   = require("../../statusgenerator");
const dotenv      = require("dotenv").config({path : "../../../.env"});
const dbm         = require("../../../db/dbm");
const {logger}    = require("../../../server/winston");
const runtime     = require("../../../server/runtime");
const check_param = require("../../checkparma");
const moment      = require("moment");

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
    let user     = false;
    let email    = false;
    let result   = true;
    let statusMessage;

    runtime.start();

    if(!check_param(userInfo.user_id, userInfo.user_email)) {
        res.json(statusGen(404, "요청 형식 오류"));
        logger.info("ram.join" + runtime.end());
    }

    else {
        user  = await dbm.find_user("USERINFOTABLE", "USER_ID", userInfo.user_id);
        email = await dbm.check_user_email("USERINFOTABLE", "USER_EMAIL", userInfo.user_email);

        if(user || email) {
            statusMessage  = user  ? "아이디 사용 중 " : "";
            statusMessage += eamil ? "이메일 사용 중"  : "";
            res.json(statusGen(405, statusMessage));
            return;
        }

        userInfo.user_register   = moment().format('YYYYMMDD');
        userInfo.user_authority  = "user";

        result = await dbm.insert("INSERT INTO USERINFOTABLE VALUES (?,?,?,?,?,?,?)", json_to_array(userInfo));
        
        if(result)  res.json(statusGen(400, "회원가입 성공"));
        else        res.json(statusGen(401, "DB 삽입 실패"));

        logger.info("ram.join" + runtime.end());
    }
}



router.post("/join", join)
module.exports = router;