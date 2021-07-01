const express   = require("express");
const passport  = require("passport");
const router    = express.Router();
const statusGen = require("../../statusgenerator");
const {logger}  = require("../../../server/winston");
const runtime   = require("../../../server/runtime")

/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

function jwtAuthentication(req, res, next) {
    passport.authenticate("jwt", {session : false}, function(error, user, info) {
        
        runtime.start();

        if(error)       res.json(statusGen(205  , "서버 오류"));
        else if(!user)  res.json(statusGen(201, "비인가 JWT"));
        else            res.json(statusGen(200, "JWT 인증 성공"));
        
        logger.info("ram.jwt_authentication" + runtime.end());

    })(req, res, next);
}


router.post("/auth", jwtAuthentication);
module.exports = router;