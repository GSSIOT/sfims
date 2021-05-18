const dotenv         = require("dotenv").config({path : ".env"});
const express        = require("express");
const passport       = require("passport");
<<<<<<< HEAD
const jwt            = require("passport-jwt");
const jwtStrategy    = require("passport-jwt").Strategy;
const localStrategy  = require("passport-local").Strategy;

function strategy(dbm) {
=======
const dbm            = require("../db/dbm");
const jwt            = require("passport-jwt");
const jwtStrategy    = require("passport-jwt").Strategy;
const localStrategy  = require("passport-local").Strategy;
const {logger}       = require("../server/winston");



function strategy() {
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

    const localConfig = {
        usernameField : "id",
        passwordField : "pw"
    }

    const jwtConfig = {
        jwtFromRequest : jwt.ExtractJwt.fromHeader("jwt"),   // jwt 추출
        secretOrKey    : process.env.JWT_SECRET_KEY
    }

    const cookieExtractor = function (req) {

        let token = null;
        // if(req && req.cookies)  token = req.cookies["jwt"];
        // console.log("cookie-jwt", token);
        if(req.headers.jwt)  token = req.headers.jwt;
<<<<<<< HEAD
        
        console.log("header-jwt", token);

=======
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
        return token;
    }

    async function localVerify(id, pw, done) {

<<<<<<< HEAD
        // try {
        //     let user = await dbm.select(QUERY, [id, pw]);  // 사용자 조회
        //     if (!user) done(null, false, { reason: "no exist user" });
        //     else done(null, user);
        // }

        // catch (error) {
        //     done(error, false);
        // }
        console.log(id, pw);
        if(id == "admin" && pw == "1234")  return done(null, {id, pw});;
        done(null, false);
=======
        logger.info("ram.local_verify");

        let user = false;

        try {
            user = await dbm.find_user(id, pw);
        }
        catch (error) {
            logger.error(error);
            done(error, false);
        }
        finally {
            if(user)  done(null, {id, pw});
            else      done(null, false)
        }
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }

    async function jwtVerify(payload, done) {

<<<<<<< HEAD
        // try {
        //     let user = await dbm.select(QUERY, payload.id);  // 사용자 조회
        //     if(!user)  done(null, false, {reason : "unvalid token"});
        //     else       done(null, user);
        // }

        // catch(error) {
        //     done(error, false);
        // }

        console.log("payload", payload);
        if(payload.id == "admin")  return done(null, {id : payload.id});
        done(null, false);

=======
        logger.info("ram.jwt_verify");

        let user = false;

        try {
            user = await dbm.find("USERINFOTABLE", "USER_ID", payload.id);
        }
        catch(error) {
            logger.error(error);
            done(error, false);
        }
        finally {
            if(!user)  done(null, false, {reason : "unvalid token"});
            else       done(null, user);
        }
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }

    passport.use("jwt",   new jwtStrategy({jwtFromRequest : cookieExtractor, secretOrKey : process.env.JWT_SECRET_KEY}, jwtVerify));
    passport.use("local", new localStrategy(localConfig, localVerify));
}

module.exports = strategy;