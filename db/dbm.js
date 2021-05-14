const mariadb  = require("mariadb");
const config   = require("./config");
const math     = require("math");
const errorGen = require("../error");


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
    //let dummy = [id];

    this.pool = mariadb.createPool(config);
    try {
        this.conn = await this.pool.getConnection();
        console.log("dbm init");
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
        console.log(errorGen(error, "dbm.init( )"));
    }
    finally {
        this.conn.release();
    }
}



/**
 * @abstract terminate dbm gracefully
 */
dbm.prototype.terminate = async function () {

    try {
        await this.pool.end();
        console.log("teminated dbm");
    }
    catch(error) {
        error.src = "dbm.terminate( )";
        throw error;
    }
}



/**
 * @abstract insert data in db
 * @param {*} query 
 * @param {*} value 
 */
dbm.prototype.insert = async function (query, value) {

    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query, value);
    }
    catch(error) {
        console.log(errorGen(error, "dbm.insert()"));
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

    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query);
    }
    catch(error) {
        console.log(errorGen(error, "dbm.delete()"));
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

    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query, value);
    }
    catch(error) {
        console.log(errorGen(error, "dbm.update()"));
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

    let result = null;

    try {
        this.conn = await this.pool.getConnection();
        result    = await this.conn.query(query);
    }
    catch(error) {
        console.log(errorGen(error, "dbm.select()"));
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

    let rows;

    try {
        rows = await this.select(`SELECT count(*) FROM ${table} WHERE ${column} = '${target}'`);
    }
    catch(error) {
        console.log(error);
    }
    finally {
        if(!rows)  return false;
        return rows[0]['count(*)'] > 0 ? true : false;
    }
}




dbm.prototype.check_user_authoriy = async function (userId, farmId) {

    let rows = null;

    try {
        rows = await this.select(`SELECT FARM_ID FROM FARMINFOTABLE WHERE USER_ID = '${userId}'`);
    }
    catch(error) {
        console.log(error);
    }
    finally {
        if(!rows)  return false;
        return rows.find(element => element['FARM_ID'] == farmId);
    }

}
module.exports = new dbm();
