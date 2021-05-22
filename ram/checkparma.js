function check_param() {

    for(let value of arguments) {
        if(!value)  return false;
    }
    return true;
}

module.exports = check_param;