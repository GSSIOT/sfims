function check_param() {

    for(let value of arguments) {
        if(value == null)  return false;
    }
    return true;
}

module.exports = check_param;