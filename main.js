// IMPORT MODULE
const server   = require("./server/server");
const {logger} = require("./server/winston");

// server on
server.on().then(() => logger.info("server is running"));


// server off