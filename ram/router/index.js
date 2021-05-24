const express = require("express");
const router  = express.Router();

/**
 * @abstract
 * @description
 */
 router.post("/login", require("./login/recaptcha"), require("./login/login"));
 router.post("/auth",  require("./auth/auth"));
 router.post("/api/*", /*require("./api/hmac"), require("./api/authority"),*/ require("./api/api"));
<<<<<<< HEAD
 router.post("/pw/*", /*require("./api/hmac"),*/ require("./pw/pw"));
=======
 router.post("/id/*", /*require("./api/hmac"),*/ require("./userinfo/id"));
 router.post("/pw/*", /*require("./api/hmac"),*/ require("./userinfo/pw"));
>>>>>>> 2af43e8a2287894fe917b54887d4e509dd7fd897
 router.post("/join", /*require("./api/hmac"),*/ require("./join/join"));
 router.post("/weather/*", /*require("./api/hmac")*/ require("./api/weather"));
 

module.exports = router;