module.exports = () => {
    for(let value of arguments) {
        if(value)  return false;
    }
    return true;
}