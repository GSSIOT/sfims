function getDate() {

    let date  = new Date();

    let year  = date.getFullYear();
    let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    let day   = date.getDay() >= 10 ? date.getDay() : '0' + date.getDay();

    let hour  = date.getHours() >= 10 ? date.getHours().toString() : '0' + date.getHours().toString();
    let minute = date.getMinutes() >= 10 ? date.getMinutes().toString() : '0' + date.getMinutes().toString();
    let second = date.getSeconds() >= 10 ? date.getSeconds().toString() : '0' + date.getSeconds().toString();

    return [year+month+day, hour+minute+second];
}

module.exports = getDate;