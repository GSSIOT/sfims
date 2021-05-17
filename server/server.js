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

    // this.dbm       = dbm.create();
    // this.ram       = ram.create();
    // this.collector = collector.create(dbm, ram);

    this.collector = collector;
    this.ram       = ram;

    try {
        await this.dbm.init();
        this.collector.init();
        await this.ram.init();
        setInterval(async() => {await this.collector.collect()}, 1000 * 5);
    }

    catch(error) {
        throw error;
    }
    // if(!this.detector.init())   return false;

    // setInterval(this.detector.detect_abnormality, 1000 * 5);

    return true;
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