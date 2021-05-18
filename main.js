// IMPORT MODULE
<<<<<<< HEAD
const server = require("./server/server");

// server on
server.on().then(() => console.log("server is running"));
=======
const server   = require("./server/server");
const {logger} = require("./server/winston");

// server on
server.on().then(() => logger.info("server is running"));
>>>>>>> b3ff5a29ab668deb958cd01a7d6865c5761c004f


// server off