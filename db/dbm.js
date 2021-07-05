const mariadb  = require("mariadb");
const config   = require("./config");
const math     = require("math");
const {logger} = require("../server/winston");
const runtime  = require("../server/runtime");
const { Console } = require("winston/lib/winston/transports");



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

    runtime.start();
    
    try {
        this.pool = mariadb.createPool(config);
        this.conn = await this.pool.getConnection();
        console.log("DATABASE NAME : ",config.database);
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
        logger.info("dbm.delete" + runtime.end());
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
        //console.log(result);
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
        console.log("check_user_authority : ", rows[0]['auth'])
        return rows[0]['auth'] > 0 ? true : false;
    }
}



/**
 * 
 * @param {*} userId 
 * @param {*} userPw 
 * @returns 
 */
dbm.prototype.check_user_password = async function (userId, userPw) {

    let rows = null;

    runtime.start();

    try {
        rows = await this.select(`SELECT count(*) AS count FROM USERINFOTABLE WHERE USER_ID = '${userId}' AND USER_PW = '${userPw}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        logger.info("dbm.check_user_password" + runtime.end());
        return rows[0]['count'] > 0 ? true : false;
    }
}



/**
 * 
 * @param {*} userId 
 * @param {*} userPw 
 * @returns 
 */
 dbm.prototype.check_user_email = async function (userId, userEmail) {

    let rows = null;

    runtime.start();

    try {
        rows = await this.select(`SELECT count(*) AS count FROM USERINFOTABLE WHERE USER_ID = '${userId}' AND USER_EMAIL = '${userEmail}'`);
    }
    catch(error) {
        logger.error(error);
    }
    finally {
        logger.info("dbm.check_user_eamil" + runtime.end());
        return rows[0]['count'] > 0 ? true : false;
    }
}
module.exports = new dbm();
