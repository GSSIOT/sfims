const ram       = require("../ram/ram");
const dbm       = require("../db/dbm");
const collector = require("../collect/collector");
const detector  = require("../detector/detector");
<<<<<<< HEAD

=======
const {logger}  = require("../server/winston");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

/**
 * @description
 */
function server() {

    this.ram       = ram;
    this.dbm       = dbm;
    this.collector = collector;
    this.detector  = null;
    this.info      = null;
}



/**
 * @description
 * @returns 
 */
server.prototype.on = async function () {

<<<<<<< HEAD
    // this.dbm       = dbm.create();
    // this.ram       = ram.create();
    // this.collector = collector.create(dbm, ram);

    this.collector = collector;
    this.ram       = ram;

    try {
        await this.dbm.init();
        this.collector.init();
        await this.ram.init();
        setInterval(async() => {await this.collector.collect()}, 1000 * 50);
    }

    catch(error) {
        throw error;
    }
    // if(!this.detector.init())   return false;

    // setInterval(this.detector.detect_abnormality, 1000 * 5);

    return true;
=======
    logger.info("server.on");

    let dbmOn       = false;
    let ramOn       = false;
    let collectorOn = false;

    try {
        dbmOn       = await this.dbm.init();
        collectorOn = await this.collector.init();
        ramOn       = await this.ram.init();
    }

    catch(error) {
        logger.error(error);
    }

    finally {
        if(dbmOn && collectorOn && ramOn)  return true;
        else                               return false;
    }
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
}



/**
 * @description
 */
server.prototype.off = function () {

<<<<<<< HEAD
=======
    logger.info("server.off");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    if(!this.ram.terminate()) {
        delete this.ram;
    }

    if(!this.collector.terminate()) {
        delete this.collector;
    }

    if(!this.dbm.terminate()) {
        delete this.dbm;
    }
}


module.exports = new server();