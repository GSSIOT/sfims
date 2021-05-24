const smtpTransport = require("./stmp");
const dotenv        = require("dotenv").config({path : "../../../.env"});
const statusGen     = require("../../statusgenerator");
const dbm           = require("../../../db/dbm");
const jwt           = require("jsonwebtoken");
const {logger}      = require("../../../server/winston");
const runtime       = require("../../../runtime");
const check_param   = require("../../checkparma");


/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_email_token_request(req, res, next) {

    let   rows        = null;
    let   token       = null;
    let   mailOptions = null;
    const userId      = req.body.user_id;
    const userEmail   = req.body.user_email;

    runtime.start();

    if(!check_param(userEmail, userId)) {
        res.send({statusCode : 230, statusMessage : "요청 파라미터 잘못됨"});
        logger.info("ram.handle_email_token_request" + runtime.end());
        return;
    }

    token       = jwt.sign({email : userEmail}, process.env.JWT_SECRET_KEY, {expiresIn : "3m"});
    mailOptions = {
        from    : "Smart Farm Integreted Management Server",
        to      : userEmail,
        subject : "스마트팜 통합관제 시스템 인증 이메일",
        text    : "오른쪽 코드를 입력해주세요 : " + token,
    };

    try {
        rows = await dbm.check_user_email(userId, userEmail);
        if(!rows) {
            res.send({statusCode : 101, statusMessage : "등록되지 않은 이메일 사용"});
            logger.info("ram.handle_email_token_request" + runtime.end());
            return;
        }
    
        smtpTransport.sendMail(mailOptions, function(error, info) {
            if(!error) {
                logger.info("ram.smtp.send_mail");
                res.json(statusGen(230, "email sending success"));
            }
            else {
                logger.error(error);
                res.json(statusGen(231, "email sending error : " + error.message));
            }
        });
    }
    catch(error) {
        logger.error(error);
    }

    logger.info("ram.handle_email_token_request" + runtime.end());
}



/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function handle_email_auth_request(req, res, next) {

    let   rows      = null;
    const userId    = req.body.user_id;
    const userEmail = req.body.user_email;
    const userToken = req.body.token;

    runtime.start();

    if(!check_param(userEmail, userToken)) {
        res.send({statusCode : 005, statusMessage : "요청 파라미터 잘못됨"});
        logger.info("ram.handle_email_auth_request" + runtime.end());
        return;
    }

    try {
        rows = await dbm.check_user_email(userId, userEmail)
        if(!rows) {
            res.send({statusCode : 005, statusMessage : "등록되지 않은 이메일 사용"});
            logger.info("ram.handle_email_auth_request" + runtime.end());
            return;
        }
        
        jwt.verify(userToken, process.env.JWT_SECRET_KEY, function (error, decode) {

            // 비밀번호 변경(비인가 토큰)
            if (error && req.url == "/pw/change") {
                res.send(statusGen(253, "password change failed because invalid signature"));
                logger.error(error);
            }
            // 이메일 인증
            if (error && req.url == "/pw/emailauth") {
                res.send(statusGen(233, "invalid signature!"));
                logger.error(error);
            }
            // 비밀번호 변경(이메일 주소 다름)
            if (decode && req.url == "/pw/change") {
                decode.email == userEmail ? next() : res.send(statusGen(254, "password change failed because invalid email"));
                logger.info("ram.handle_email_auth_request" + runtime.end());
            }
            // 이메일 인증
            if (decode && req.url == "/pw/emailauth") {
                decode.email == userEmail ? res.send(statusGen(232, "email authentication success")) : res.send(statusGen(234, "invalid email"));
                logger.info("ram.handle_email_auth_request" + runtime.end());
            }
        });
    }
    catch(error) {
        logger.error(error);
    }

}



module.exports = {handle_email_auth_request, handle_email_token_request};