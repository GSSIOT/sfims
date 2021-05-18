const _bcrypt = require("bcrypt");



/**
 * @abstract
 * @member
 */
function Bcrypt() {

    this.bcrypt     = _bcrypt;
    this.saltRounds = 10;

}



/**
 * @abstract : 키값에 대한 해시값을 반환
 * @param {*} key : 키값
 * @returns : 키값에 대한 해시값
 */
Bcrypt.prototype.hash = async function (key) {

    let hashValue = await this.bcrypt.hash(key, this.saltRounds);
    return hashValue;

}



/**
 * @abstract : 두 키값이 같은지 비교하여 같으면 참, 같지 않으면 거짓을 반환
 * @param {*} key : 비교할 해시의 키값
 * @param {*} hashValue : 비교할 해시
 * @returns : 같으면 참, 같지 않으면 거짓
 */
Bcrypt.prototype.compare = async function (key, hashValue) {

    let result = await this.bcrypt.compare(key, hashValue);
    return result;
}



/**
 * @abstract : hash 솔팅 횟수를 변경 (default : 10)
 * @param {*} number : 솔팅 횟수
 */
Bcrypt.prototype.set_round = function (number) {
    this.saltRounds = number;
}



/**
 * @abstract : 해시값의 솔팅 라운드 값을 반환
 * @param {*} hashValue : 확인할 해시값
 * @returns : 확인된 솔팅 라운드 값
 */
Bcrypt.prototype.get_round = function (hashValue) {
    return this.bcrypt.getRounds(hashValue);
}

module.exports = new Bcrypt();