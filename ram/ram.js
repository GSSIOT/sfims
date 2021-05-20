const express             = require("express");
const passport            = require("passport");
const strategy            = require("./strategy");
const cookieParser        = require("cookie-parser");
const cors                = require("cors");
const dotenv              = require("dotenv").config({path : "../.env"});
const logger              = require("../server/winston").logger;
const expressWinston      = require("../server/winston").expressWinston;
const expressErrorWinston = require("../server/winston").expressErrorWinston;



function ram(dbm) {
    this.app      = express();
    this.dbm      = require("../db/dbm");
    this.detector = require("../detector/detector");
}



ram.prototype.init = function () {

    return new Promise((resolve, reject) => {
        
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : false}));
        this.app.use(cors({origin : true, credentials : true}));
        this.app.use(expressWinston);
        this.app.use(expressErrorWinston);
        strategy();
    
        this.app.use("/", require("./router/index"));
        this.app.listen("1235", function () { resolve(); });

        logger.info("ram.init")
    });
}



ram.prototype.terminate = function () {
    logger.info("ram.terminate");
}


module.exports = new ram();
