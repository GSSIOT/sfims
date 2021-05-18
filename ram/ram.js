<<<<<<< HEAD
const express      = require("express");
const passport     = require("passport");
const strategy     = require("./strategy");
const cookieParser = require("cookie-parser");
const cors         = require("cors");
const dotenv       = require("dotenv").config({path : "../.env"});
=======
const express             = require("express");
const passport            = require("passport");
const strategy            = require("./strategy");
const cookieParser        = require("cookie-parser");
const cors                = require("cors");
const dotenv              = require("dotenv").config({path : "../.env"});
const logger              = require("../server/winston").logger;
const expressWinston      = require("../server/winston").expressWinston;
const expressErrorWinston = require("../server/winston").expressErrorWinston;

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f


function ram(dbm) {
    this.app      = express();
    this.dbm      = require("../db/dbm");
    this.detector = require("../detector/detector");
}



ram.prototype.init = function () {

    return new Promise((resolve, reject) => {
<<<<<<< HEAD
=======

        logger.info("ram.init")

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : false}));
        this.app.use(cors({origin : true, credentials : true}));
<<<<<<< HEAD
        //strategy(this.dbm);
        strategy();
    
        this.app.use("/", require("./router/index"));
        this.app.listen("1235", function () { console.log( "ram init" ); resolve(); });
=======
        this.app.use(expressWinston);
        this.app.use(expressErrorWinston);
        strategy();
    
        this.app.use("/", require("./router/index"));
        this.app.listen("1235", function () { resolve(); });
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    });
}



ram.prototype.terminate = function () {
<<<<<<< HEAD
    console.log("teminated ram");
=======
    logger.info("ram.terminate");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
}


module.exports = new ram();
