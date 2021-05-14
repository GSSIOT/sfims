const dotenv         = require("dotenv").config({path : ".env"});
const express        = require("express");
const passport       = require("passport");
const jwt            = require("passport-jwt");
const jwtStrategy    = require("passport-jwt").Strategy;
const localStrategy  = require("passport-local").Strategy;

function strategy(dbm) {

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
    }

    async function jwtVerify(payload, done) {

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

    }

    passport.use("jwt",   new jwtStrategy({jwtFromRequest : cookieExtractor, secretOrKey : process.env.JWT_SECRET_KEY}, jwtVerify));
    passport.use("local", new localStrategy(localConfig, localVerify));
}

module.exports = strategy;