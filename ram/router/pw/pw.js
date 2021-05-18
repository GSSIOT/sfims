const express       = require("express");
const router        = express.Router();
const smtpTransport = require("./stmp");
const dotenv        = require("dotenv").config({path : "../../../.env"});
const statusGen     = require("../../statusgenerator");
const dbm           = require("../../../db/dbm");
const jwt           = require("jsonwebtoken");
<<<<<<< HEAD

=======
const {logger}      = require("../../../server/winston");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f


/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handleEmailTokenRequest(req, res, next) {

<<<<<<< HEAD
=======
    logger.info("ram.handle_email_token_request");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    const userEmail   = req.body.email;
    const token       = jwt.sign({email : userEmail}, process.env.JWT_SECRET_KEY);
    const mailOptions = {
        from    : "Smart Farm Integreted Management Server",
        to      : userEmail,
        subject : "스마트팜 통합관제 시스템 인증 이메일",
        text    : "오른쪽 코드를 입력해주세요 : " + token,
    };

<<<<<<< HEAD
    console.log("mailOptions : ", mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, info) {
        if(!error) {
            console.log("email sending success");
            res.json(statusGen(230, "email sending success"));
        }
        else {
            console.log("email sending error : " + error.message);
=======
    smtpTransport.sendMail(mailOptions, function(error, info) {
        if(!error) {
            logger.info("ram.smtp.send_mail");
            res.json(statusGen(230, "email sending success"));
        }
        else {
            logger.error(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
            res.json(statusGen(231, "email sending error : " + error.message));
        }
    });
}



/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function handleEmailAuthRequest(req, res, next) {

<<<<<<< HEAD
=======
    logger.info("ram.handle_email_auth_request");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    const userEmail = req.body.email;
    const userToken = req.body.token;

    jwt.verify(userToken, process.env.JWT_SECRET_KEY, function(error, decode) {

        // 비밀번호 변경(비인가 토큰)
        if(error && req.url == "/pw/change") {
<<<<<<< HEAD
=======
            logger.error(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
            res.json(statusGen(253, "password change failed because invalid signature"));
        }
        // 이메일 인증
        if(error && req.url == "/pw/emailauth") {
<<<<<<< HEAD
=======
            logger.error(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
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
}



/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function handlePasswordChangeRequest(req, res, next) {

    // const newPassword = req.body.password;

    // 비밀번호 체크

    // 암호화
    
    // 변경
    // dbm.update()
    res.json(statusGen(250, "password changed"));

}



router.post("/pw/email", handleEmailTokenRequest);
router.post("/pw/emailauth", handleEmailAuthRequest);
router.post("/pw/change", handleEmailAuthRequest, handlePasswordChangeRequest);

module.exports = router;