const express = require("express");
const router  = express.Router();

/**
 * @abstract
 * @description
 */
router.post("/login", /*require("./login/recaptcha"),*/ require("./login/login"));
router.post("/auth",  require("./auth/auth"));
router.post("/api/*", /*require("./api/hmac"),*/ require("./api/authority"), require("./api/api"));
router.post("/pw/*", /*require("./api/hmac"),*/ require("./pw/pw"));
router.post("/join", /*require("./api/hmac),*/ require("./join/join"));

module.exports = router;