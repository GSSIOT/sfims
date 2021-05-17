const express       = require("express");
const router        = express.Router();
const smtpTransport = require("./stmp");
const dotenv        = require("dotenv").config({path : "../../../.env"});
const statusGen     = require("../../statusgenerator");
const dbm           = require("../../../db/dbm");
const jwt           = require("jsonwebtoken");



/**
 * @description
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function handleEmailTokenRequest(req, res, next) {

    const userEmail   = req.body.email;
    const token       = jwt.sign({email : userEmail}, process.env.JWT_SECRET_KEY);
    const mailOptions = {
        from    : "Smart Farm Integreted Management Server",
        to      : userEmail,
        subject : "스마트팜 통합관제 시스템 인증 이메일",
        text    : "오른쪽 코드를 입력해주세요 : " + token,
    };

    console.log("mailOptions : ", mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, info) {
        if(!error) {
            console.log("이메일 전송 성공");
            res.json(statusGen(230, "이메일 전송 성공"));
        }
        else {
            console.log("이메일 전송 실패 : " + error.message);
            res.json(statusGen(231, "이메일 전송 실패 : " + error.message));
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

    const userEmail = req.body.email;
    const userToken = req.body.token;

    jwt.verify(userToken, process.env.JWT_SECRET_KEY, function(error, decode) {

        // 비밀번호 변경(비인가 토큰)
        if(error && req.url == "/pw/change") {
            res.json(statusGen(253, "이메일 인증 실패"));
        }
        // 이메일 인증
        if(error && req.url == "/pw/emailauth") {
            res.json(statusGen(233, "이메일 인증 실패"));
        }
        // 비밀번호 변경(이메일 주소 다름)
        if(decode && req.url == "/pw/change") {
            decode.email == userEmail ? next() : res.json(statusGen(254, "이메일 주소가 다름"));
        }
        // 이메일 인증
        if(decode && req.url == "/pw/emailauth") {
            decode.email == userEmail ? res.json(statusGen(232, "이메일 인증 실패")) : res.json(statusGen(234, "등록되지 않은 이메일"));
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
    res.json(statusGen(250, "비밀번호 변경 성공"));

}



router.post("/pw/email", handleEmailTokenRequest);
router.post("/pw/emailauth", handleEmailAuthRequest);
router.post("/pw/change", handleEmailAuthRequest, handlePasswordChangeRequest);

module.exports = router;