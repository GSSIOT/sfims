require("dotenv").config({path : "../.env"});

module.exports = {
    host     : process.env.DB_HOST,
    port     : process.env.DB_MAINPORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PW,
    database : process.env.DB_DATABASE
}
