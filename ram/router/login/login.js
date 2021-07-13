const express   = require("express");
const passport  = require("passport");
const router    = express.Router();
const jwt       = require("jsonwebtoken");
const statusGen = require("../../statusgenerator");
const dotenv    = require("dotenv").config({path : "../../../.env"});
const {logger}  = require("../../../server/winston");
const runtime   = require("../../../server/runtime");


/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function login(req, res, next) {
    passport.authenticate("local", function(error, user, info) {

        let _jwt = jwt.sign({id : user.id, auth : user.authority}, process.env.JWT_SECRET_KEY);
        
        runtime.start();

        if(!user) {
            res.json(statusGen(101, "아이디가 없거나 비밀번호가 틀림"));
            logger.info("ram.login_authentication" + runtime.end());
        }

        else {
            res.json({
                jwt : _jwt,
                statusCode : 100,
                statusMessage : "로그인 성공"
            });
            logger.info("ram.login_authentication" + runtime.end());
        }
    })(req, res, next);
}




router.post("/login", login)
module.exports = router;