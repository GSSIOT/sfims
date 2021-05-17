const ram       = require("../ram/ram");
const dbm       = require("../db/dbm");
const collector = require("../collect/collector");
const detector  = require("../detector/detector");


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

    let dbmOn       = false;
    let ramOn       = false;
    let collectorOn = false;

    try {
        dbmOn       = await this.dbm.init();
        collectorOn = await this.collector.init();
        ramOn       = await this.ram.init();
    }

    catch(error) {
        console.log(error);
    }

    finally {
        if(dbmOn && collectorOn && ramOn)  return true;
        else                               return false;
    }
}



/**
 * @description
 */
server.prototype.off = function () {

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