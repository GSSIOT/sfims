const express   = require("express");
const router    = express.Router();
const statusGen = require("../../statusgenerator");
const dotenv    = require("dotenv").config({path : "../../../.env"});
const dbm       = require("../../../db/dbm");


function json_to_array(json) {

    let ret = [];

    for(let prop in json) {
        ret.push(json[prop]);
    }

    return ret;
}


/**
 * @abstract
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function join(req, res, next) {
    
    let userInfo = req.body;
    let user     = await dbm.find("USERINFOTABLE", "USER_ID", userInfo.user_id);
    let email    = await dbm.find("USERINFOTABLE", "USER_EMAIL", userInfo.user_email);
    let result   = true;
    let statusMessage;

    console.log(req.body.user_info);

    if(user || email) {
        statusMessage  = user  ? "ID IN USE" : "";
        statusMessage += email ? " EMAIL IN USE" : "";
        res.json(statusGen(401, statusMessage));
    }

    else {

        userInfo.user_register   = Date.now();
        userInfo.user_authority  = "user";

        console.log(userInfo)

        result = await dbm.insert("INSERT INTO USERINFOTABLE VALUES (?,?,?,?,?,?,?)", json_to_array(userInfo));
        
        if(result)  res.json(statusGen(400, "회원가입 성공"));
        else        res.json(statusGen(001, "데이터베이스 에러"));
    }
}



router.post("/join", join)
module.exports = router;