const express      = require("express");
const passport     = require("passport");
const strategy     = require("./strategy");
const cookieParser = require("cookie-parser");
const cors         = require("cors");
const dotenv       = require("dotenv").config({path : "../.env"});
const logger       = require("../server/winston");

function ram(dbm) {
    this.app      = express();
    this.dbm      = require("../db/dbm");
    this.detector = require("../detector/detector");
}



ram.prototype.init = function () {

    return new Promise((resolve, reject) => {

        logger.info("ram.init")

        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : false}));
        this.app.use(cors({origin : true, credentials : true}));
        //strategy(this.dbm);
        strategy();
    
        this.app.use("/", require("./router/index"));
        this.app.listen("1235", function () { resolve(); });
    });
}



ram.prototype.terminate = function () {
    logger.info("ram.terminate");
}


module.exports = new ram();
