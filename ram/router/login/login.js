const express   = require("express");
const passport  = require("passport");
const router    = express.Router();
const jwt       = require("jsonwebtoken");
const statusGen = require("../../statusgenerator");
const dotenv    = require("dotenv").config({path : "../../../.env"});
const {logger}  = require("../../../server/winston");


/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function login(req, res, next) {
    passport.authenticate("local", function(error, user, info) {

        logger.info("ram.login_authentication");

        let _jwt = jwt.sign({id : user.id}, process.env.JWT_SECRET_KEY);

        if(!user) {
            res.json(statusGen(102, "login failed"));
        }
        else {
            //res.setHeader("jwt", _jwt);
            //res.json(statusGen(100, "login success"));

            res.json({
                jwt : _jwt,
                statusCode : 100,
                statusMessage : "login success"
            })
            //res.cookie("jwt", _jwt, {secure : false, httpOnly : false});
        }
    })(req, res, next);
}




router.post("/login", login)
module.exports = router;