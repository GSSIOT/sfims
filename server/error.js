module.exports = (error, src) => {

    const date = new Date();

    error.src  = src;
    error.time = date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString(); 

    return error;

} 