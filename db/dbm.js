const mariadb  = require("mariadb");
const config   = require("./config");
const math     = require("math");
const errorGen = require("../error");
const {logger} = require("../server/winston");


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

    logger.info("dbm.init")

    let result;
    
    this.pool = mariadb.createPool(config);

    try {
        this.conn = await this.pool.getConnection();
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
        logger.error(error);
    }
    finally {
        this.conn.release();
    }
}



/**
 * @abstract terminate dbm gracefully
 */
dbm.prototype.terminate = async function () {

    logger.info("dbm.terminate");

    try {
        await this.pool.end();
        console.log("teminated dbm");
    }
    catch(error) {
        logger.error(error);
    }

    finally {
        if(this.pool)  delete this.pool;
    }
}



/**
 * @abstract insert data in db
 * @param {*} query 
 * @param {*} value 
 */
dbm.prototype.insert = async function (query, value) {

    logger.info("dbm.insert");

    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query, value);
    }
    catch(error) {
        logger.error(error.message);
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

    logger.info("dbm.delete");

    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query);
    }
    catch(error) {
        logger.error(error);
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

    logger.info("dbm.update");

    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query, value);
    }
    catch(error) {
        logger.error(error);
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

    logger.info("dbm.select");

    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        this.conn.release();
        return result;
    }
}



/**
 * @abstract
 * @param {*} table
 * @param {*} column
 * @param {*} target
 */
dbm.prototype.find = async function (table, column, target) {

    logger.info("dbm.find");

    let rows = null;

    try {
        rows = await this.select(`SELECT count(*) FROM ${table} WHERE ${column} = '${target}'`);
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

    let rows = null;

    try {
        rows = await this.select(`SELECT FARM_ID FROM FARMINFOTABLE WHERE USER_ID = '${userId}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        if(!rows)  return false;
        return rows.find(element => element['FARM_ID'] == farmId);
    }
}



module.exports = new dbm();