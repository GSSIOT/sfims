// IMPORT MODULE
const logger = require("./server/winston");
const server = require("./server/server");

// server on
server.on().then(() => logger.info("server is running"));


// server off