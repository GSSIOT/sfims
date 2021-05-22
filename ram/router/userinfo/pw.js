const express       = require("express");
const router        = express.Router();
const smtpTransport = require("./stmp");
const dotenv        = require("dotenv").config({path : "../../../.env"});
const statusGen     = require("../../statusgenerator");
const dbm           = require("../../../db/dbm");
const jwt           = require("jsonwebtoken");
const {logger}      = require("../../../server/winston");
const runtime       = require("../../../runtime");
const check_param   = require("../../checkparma");
const { handle_email_auth_request, handle_email_token_request } = require("./emailauth");





/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handle_password_change_request(req, res, next) {
 
    let id     = req.body.user_id;
    let pw     = req.body.user_pw;
    let same   = true;
    let result = null;
    
    if(!check_param(id, pw)) {
        res.send({statusCode : 101, statusMessage : "비밀번호 변경 실패"});
        logger.info("ram.handle_password_change_request" + runtime.end());
        return;
    }

    try {
        same = await dbm.check_user_password(id, pw);
        console.log(same);
        if(!same)  result = await dbm.update(`UPDATE USERINFOTABLE SET USER_PW = '${pw}' WHERE USER_ID = '${id}'`);
    }
    catch(error) {
        logger.info(error);
    }
    finally {
        if(result)  res.send({statusCode : 100, statusMessage : "비밀번호 변경 성공"});
        else        res.send({statusCode : 101, statusMessage : "비밀번호 변경 실패"});
        logger.info("ram.handle_password_change_request" + runtime.end());
    }
}



router.post("/pw/emailauth", handle_email_token_request);
router.post("/pw/change", handle_email_auth_request, handle_password_change_request);

module.exports = router;