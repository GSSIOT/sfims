const mariadb  = require("mariadb");
const config   = require("./config");
const math     = require("math");
const errorGen = require("../error");
<<<<<<< HEAD
=======
const {logger} = require("../server/winston");
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f


/**
 * @description
 * @member
 * @member
 */
function dbm () {
    this.pool   = null;
    this.conn   = null;
}



/**
 * @abstract init dbm
 */
dbm.prototype.init = async function () {

<<<<<<< HEAD
    let result;
    //let dummy = [id];

    this.pool = mariadb.createPool(config);
    try {
        this.conn = await this.pool.getConnection();
        console.log("dbm init");
=======
    logger.info("dbm.init")

    let result;
    
    this.pool = mariadb.createPool(config);

    try {
        this.conn = await this.pool.getConnection();
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
        return this.conn;
        
        // result    = await this.conn.query("INSERT ERROR", dummy);
        // if(result.warningStatus)  throw new Error("INSERT ERROR");

        // result    = await this.conn.query("SELECT");
        // if(result != dummy)  throw new Error("SELECT ERROR");

        // result    = await this.conn.query("UPDATE");
        // if(result.warningStatus)  throw new Error("UPDATE ERROR");

        // result    = await this.conn.query("DELETE");
        // if(result.warningStatus)  throw new Error("DELETE ERROR");
    }
    catch(error) {
<<<<<<< HEAD
        console.log(errorGen(error, "dbm.init( )"));
=======
        logger.error(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }
    finally {
        this.conn.release();
    }
}



/**
 * @abstract terminate dbm gracefully
 */
dbm.prototype.terminate = async function () {

<<<<<<< HEAD
=======
    logger.info("dbm.terminate");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    try {
        await this.pool.end();
        console.log("teminated dbm");
    }
    catch(error) {
<<<<<<< HEAD
        error.src = "dbm.terminate( )";
        throw error;
=======
        logger.error(error);
    }

    finally {
        if(this.pool)  delete this.pool;
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }
}



/**
 * @abstract insert data in db
 * @param {*} query 
 * @param {*} value 
 */
dbm.prototype.insert = async function (query, value) {

<<<<<<< HEAD
=======
    logger.info("dbm.insert");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query, value);
    }
    catch(error) {
<<<<<<< HEAD
        console.log(errorGen(error, "dbm.insert()"));
=======
        logger.error(error.message);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }
    finally {
        this.conn.release();
        return result;
    }
}



/**
 * @abstract delete data in db
 * @param {*} query 
 */
dbm.prototype.delete = async function (query) {

<<<<<<< HEAD
=======
    logger.info("dbm.delete");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query);
    }
    catch(error) {
<<<<<<< HEAD
        console.log(errorGen(error, "dbm.delete()"));
=======
        logger.error(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }
    finally {
        this.conn.release();
        return result;
    }
}



/**
 * @abstract update
 * @param {*} query 
 * @param {*} value 
 */
dbm.prototype.update = async function (query, value) {

<<<<<<< HEAD
=======
    logger.info("dbm.update");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query, value);
    }
    catch(error) {
<<<<<<< HEAD
        console.log(errorGen(error, "dbm.update()"));
=======
        logger.error(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }
    finally {
        this.conn.release();
        return result;
    }
}



/**
 * @abstract select
 * @param {*} query 
 */
dbm.prototype.select = async function (query) {

<<<<<<< HEAD
=======
    logger.info("dbm.select");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query);
    }
    catch(error) {
<<<<<<< HEAD
        console.log(errorGen(error, "dbm.select()"));
=======
        logger.error(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }
    finally {
        this.conn.release();
        return result;
    }
}


<<<<<<< HEAD
=======

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
/**
 * @abstract
 * @param {*} table
 * @param {*} column
 * @param {*} target
 */
dbm.prototype.find = async function (table, column, target) {

<<<<<<< HEAD
    let rows;
=======
    logger.info("dbm.find");

    let rows = null;
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f

    try {
        rows = await this.select(`SELECT count(*) FROM ${table} WHERE ${column} = '${target}'`);
    }
    catch(error) {
<<<<<<< HEAD
        console.log(error);
=======
        logger.error(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }
    finally {
        if(!rows)  return false;
        return rows[0]['count(*)'] > 0 ? true : false;
    }
}



<<<<<<< HEAD

dbm.prototype.check_user_authoriy = async function (userId, farmId) {

=======
/**
 * 
 * @param {*} id 
 * @param {*} password 
 * @returns 
 */
dbm.prototype.find_user = async function (id, password) {

    logger.info("dbm.find_user");

    let rows = null; 

    try {
        rows = await this.select(`SELECT count(*) FROM USERINFOTABLE WHERE USER_ID = '${id}' AND USER_PW = '${password}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  return false;
        return rows[0]['count(*)'] > 0 ? true : false;
    }
}



/**
 * 
 * @param {*} userId 
 * @param {*} farmId 
 * @returns 
 */
dbm.prototype.check_user_authoriy = async function (userId, farmId) {

    logger.info("dbm.check_user_authority");

>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    let rows = null;

    try {
        rows = await this.select(`SELECT FARM_ID FROM FARMINFOTABLE WHERE USER_ID = '${userId}'`);
    }
    catch(error) {
<<<<<<< HEAD
        console.log(error);
=======
        logger.error(error);
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
    }
    finally {
        if(!rows)  return false;
        return rows.find(element => element['FARM_ID'] == farmId);
    }
<<<<<<< HEAD

}
module.exports = new dbm();
=======
}



module.exports = new dbm();
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f
