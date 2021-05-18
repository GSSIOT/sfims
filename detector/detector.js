const dbm    = require("../db/dbm");
const fcm    = require("./fcm");
const admin  = require("firebase-admin");
const dotenv = require("dotenv").config({path : "../.env"});
 

/**
 * @description
 */
function detector() {

}



/**
 * @description
 */
detector.prototype.init = function () {

}



/**
 * @description
 */
detector.prototype.terminate = function () {
    
}



/**
 * @description
 */
detector.prototype.send_fcm = async function (title, message, userId, callback) {

    // userId 토큰확인
    // const userToken = await dbm.select("usertoken");
    const payload = {
        notification : {
            title : title,
            body  : message,
        },
        token : userToken,
    }
    
    admin.initializeApp({credential : admin.credential.cert(process.env.FCM_TOKEN)});
    admin.messaging().send(payload)
                     .then (  res   => {callback(res);})
                     .catch( error  => {callback(error);});
}



/**
 * @description
 */
detector.prototype.detect_abnormality = async function () {

    let settingValue = await dbm.select("SELECT SETTING VALUE");
    let average      = await dbm.select("AVERAGE FOR 5 MINUTES");
    let user         = await dbm.select("SELECT ABNORAML FARM USER");
    
    if(average <= settingValue) {
        this.send_fcm(user.phoneNumber, "하우스 이상 감지");
    }

    else {
        this.send_fcm("하우스 이상 감지", "온도 설정값 이하로 떨어짐", "관계자");
    }
}

module.exports = new detector();