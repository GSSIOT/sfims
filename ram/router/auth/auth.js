const express   = require("express");
const passport  = require("passport");
const router    = express.Router();
const statusGen = require("../../statusgenerator");


/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

function jwtAuthentication(req, res, next) {
    passport.authenticate("jwt", {session : false}, function(error, user, info) {
        
        console.log(user);

        if(error)       res.json(statusGen(0  , "server error"));
        else if(!user)  res.json(statusGen(201, "authentication failed"));
        else            res.json(statusGen(200, "authentication success"));

    })(req, res, next);
}


router.post("/auth", jwtAuthentication);
module.exports = router;