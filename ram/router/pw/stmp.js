const nodemailer = require("nodemailer");
const dotenv     = require("dotenv").config({path : "../../../.env"});

const smtpTransport = nodemailer.createTransport({
    service : "gamil",
    host    : "smtp.gmail.com",
    port    : 587,
    secure  : false,
    auth    : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS,
    },
    tls     : {
        rejectUnauthorized : false,
    }
});

module.exports = smtpTransport;