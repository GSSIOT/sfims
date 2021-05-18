const express   = require("express");
const passport  = require("passport");
const router    = express.Router();
const statusGen = require("../../statusgenerator");
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

function jwtAuthentication(req, res, next) {
    passport.authenticate("jwt", {session : false}, function(error, user, info) {
        
<<<<<<< HEAD
        console.log(user);
=======
        logger.info("ram.jwt_authentication");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

        if(error)       res.json(statusGen(0  , "server error"));
        else if(!user)  res.json(statusGen(201, "authentication failed"));
        else            res.json(statusGen(200, "authentication success"));

    })(req, res, next);
}


router.post("/auth", jwtAuthentication);
module.exports = router;