const express = require("express");
const router  = express.Router();

/**
 * @abstract
 * @description
 */
 router.post("/login", require("./login/recaptcha"), require("./login/login"));
 router.post("/auth", require("./auth/auth"));
 router.post("/api/*", /*require("./api/hmac"),*/ require("./api/api"));
 router.post("/id/*", require("./api/hmac"), require("./find/id"));
 router.post("/pw/*", require("./api/hmac"), require("./find/pw"));
 router.post("/join", require("./api/hmac"), require("./join/join"));
 router.post("/weather/*", require("./api/hmac"), require("./api/weather"));
 router.post("/market-price/*", /*require("./api/hmac"),*/ require("./api/marketprice"));
 

module.exports = router;