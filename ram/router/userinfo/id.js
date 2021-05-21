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
async function handle_id_change_request(req, res, next) {
 
    let id     = req.body.user_id;
    let name   = req.body.user_name;
    let phone  = req.body.user_phone;
    let result = null;
    
    runtime.start();

    if(!check_param(id, name, phone)) {
        res.send({statusCode : 101, statusMessage : "아이디 찾기 실패"});
        logger.info("ram.handle_id_change_request" + runtime.end());
        return;
    }

    try {
        result = await dbm.select(`SELECT USER_ID FROM USERINFOTABLE WHERE USER_NAME = '${name}' AND USER_PHONE = '${phone}'`);
    }
    catch(error) {
        logger.info(error);
    }
    finally {
        if(result)  res.send({statusCode : 100, statusMessage : "아이디 찾기 성공", payload : result});
        else        res.send({statusCode : 101, statusMessage : "아이디 찾기 실패"});
        logger.info("ram.handle_id_change_request" + runtime.end());
    }
}



router.post("/id/emailauth", handle_email_token_request);
router.post("/id/find", /*handle_email_auth_request,*/ handle_id_change_request);

module.exports = router;