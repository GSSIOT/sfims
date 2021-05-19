const mariadb  = require("mariadb");
const config   = require("./config");
const math     = require("math");
const errorGen = require("../error");
const {logger} = require("../server/winston");
const runtime  = require("../runtime");



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

    let result;
    
    runtime.start();
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
        logger.info("dbm.init" + runtime.end());
    }
}



/**
 * @abstract terminate dbm gracefully
 */
dbm.prototype.terminate = async function () {

    runtime.start();

    try {
        await this.pool.end();
        console.log("teminated dbm");
    }
    catch(error) {
        logger.error(error);
    }
    
    finally {
        if(this.pool)  delete this.pool;
        logger.info("dbm.terminate" + runtime.end());
    }
}



/**
 * @abstract insert data in db
 * @param {*} query 
 * @param {*} value 
 */
dbm.prototype.insert = async function (query, value) {

    let result = null;
    let start  = 0;

    runtime.start();

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query, value);
    }
    catch(error) {
        logger.error(error.message);
    }
    finally {
        this.conn.release();
        logger.info("dbm.insert" + runtime.end());    
        if(result)  return true;
        else        return false;
    }
}



/**
 * @abstract delete data in db
 * @param {*} query 
 */
dbm.prototype.delete = async function (query) {

    let result = null;
    let start  = 0;

    runtime.start();

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        this.conn.release();
        logger.info("dbm.delete" + runtime.end);
        if(result)  return true;
        else        return false;
    }
}



/**
 * @abstract update
 * @param {*} query 
 * @param {*} value 
 */
dbm.prototype.update = async function (query, value) {

    let result = null;

    runtime.start();

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query, value);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        this.conn.release();
        logger.info("dbm.update" + runtime.end());
        if(result)  return true;
        else        return false;
    }
}



/**
 * @abstract select
 * @param {*} query 
 */
dbm.prototype.select = async function (query) {

    let result = null;

    runtime.start();

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        this.conn.release();
        logger.info("dbm.select" + runtime.end());
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

    let rows = null;

    runtime.start();

    try {
        rows = await this.select(`SELECT count(*) FROM ${table} WHERE ${column} = '${target}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        logger.info("dbm.find" + runtime.end());
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

    let rows = null; 

    runtime.start();

    try {
        rows = await this.select(`SELECT count(*) FROM USERINFOTABLE WHERE USER_ID = '${id}' AND USER_PW = '${password}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        logger.info("dbm.find_user" + runtime.end());
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
dbm.prototype.check_user_authority = async function (userId, farmId) {

    let rows = null;

    runtime.start();

    try {
        rows = await this.select(`SELECT count(*) AS auth FROM FARMINFOTABLE WHERE USER_ID = '${userId}' AND FARM_ID = ${farmId}`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        logger.info("dbm.check_user_authority" + runtime.end());
        return rows[0]['auth'] > 0 ? true : false;
    }
}



module.exports = new dbm();
