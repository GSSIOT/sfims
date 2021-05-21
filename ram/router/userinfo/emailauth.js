const smtpTransport = require("./stmp");
const dotenv        = require("dotenv").config({path : "../../../.env"});
const statusGen     = require("../../statusgenerator");
const dbm           = require("../../../db/dbm");
const jwt           = require("jsonwebtoken");
const {logger}      = require("../../../server/winston");
const runtime       = require("../../../runtime");


/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handle_email_token_request(req, res, next) {

    const userEmail   = req.body.email;
    const token       = jwt.sign({email : userEmail}, process.env.JWT_SECRET_KEY);
    const mailOptions = {
        from    : "Smart Farm Integreted Management Server",
        to      : userEmail,
        subject : "스마트팜 통합관제 시스템 인증 이메일",
        text    : "오른쪽 코드를 입력해주세요 : " + token,
    };

    runtime.start();

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

    logger.info("ram.handle_email_token_request" + runtime.end());

}



/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function handle_email_auth_request(req, res, next) {

    const userEmail = req.body.email;
    const userToken = req.body.token;

    runtime.start();

    jwt.verify(userToken, process.env.JWT_SECRET_KEY, function(error, decode) {

        // 비밀번호 변경(비인가 토큰)
        if(error && req.url == "/pw/change") {
            logger.error(error);
            res.json(statusGen(253, "password change failed because invalid signature"));
        }
        // 이메일 인증
        if(error && req.url == "/pw/emailauth") {
            logger.error(error);
            res.json(statusGen(233, "invalid signature!"));
        }
        // 비밀번호 변경(이메일 주소 다름)
        if(decode && req.url == "/pw/change") {
            decode.email == userEmail ? next() : res.json(statusGen(254, "password change failed because invalid email"));
        }
        // 이메일 인증
        if(decode && req.url == "/pw/emailauth") {
            decode.email == userEmail ? res.json(statusGen(232, "email authentication success")) : res.json(statusGen(234, "invalid email"));
        }
    });

    logger.info("ram.handle_email_auth_request" + runtime.end())
}



module.exports = {handle_email_auth_request, handle_email_token_request};