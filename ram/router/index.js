const express = require("express");
const router  = express.Router();

/**
 * @abstract
 * @description
 */
router.post("/login", require("./login/recaptcha"), require("./login/login"));
router.post("/auth",  require("./auth/auth"));
<<<<<<< HEAD
router.post("/api/*", /*require("./api/hmac"),*/ require("./api/authority"), require("./api/api"));
router.post("/pw/*", /*require("./api/hmac"),*/ require("./pw/pw"));
router.post("/join", /*require("./api/hmac),*/ require("./join/join"));
=======
router.post("/api/*", require("./api/hmac"), require("./api/authority"), require("./api/api"));
router.post("/pw/*", require("./api/hmac"), require("./pw/pw"));
router.post("/join", require("./api/hmac"), require("./join/join"));
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

module.exports = router;