const dotenv         = require("dotenv").config({path : ".env"});
const express        = require("express");
const passport       = require("passport");
const dbm            = require("../db/dbm");
const jwt            = require("passport-jwt");
const jwtStrategy    = require("passport-jwt").Strategy;
const localStrategy  = require("passport-local").Strategy;



function strategy() {

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
        
        console.log("header-jwt", token);

        return token;
    }

    async function localVerify(id, pw, done) {

        let user = false;

        try {
            user = await dbm.find_user(id, pw);
        }
        catch (error) {
            done(error, false);
        }
        finally {
            if(user)  done(null, {id, pw});
            else      done(null, false)
        }
    }

    async function jwtVerify(payload, done) {

        let user = false;

        try {
            user = await dbm.find("USERINFOTABLE", "USER_ID", payload.id);
        }
        catch(error) {
            done(error, false);
        }
        finally {
            if(!user)  done(null, false, {reason : "unvalid token"});
            else       done(null, user);
        }
    }

    passport.use("jwt",   new jwtStrategy({jwtFromRequest : cookieExtractor, secretOrKey : process.env.JWT_SECRET_KEY}, jwtVerify));
    passport.use("local", new localStrategy(localConfig, localVerify));
}

module.exports = strategy;