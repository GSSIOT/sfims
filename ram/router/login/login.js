const express   = require("express");
const passport  = require("passport");
const router    = express.Router();
const jwt       = require("jsonwebtoken");
const statusGen = require("../../statusgenerator");
const dotenv    = require("dotenv").config({path : "../../../.env"});
<<<<<<< HEAD
=======
const {logger}  = require("../../../server/winston");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f


/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function login(req, res, next) {
    passport.authenticate("local", function(error, user, info) {

<<<<<<< HEAD
=======
        logger.info("ram.login_authentication");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
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