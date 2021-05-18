const Websocket = require("ws");
const ws = new Websocket("ws://localhost:3001");


const readline = require("readline");
const rl = readline.createInterface({
    input  : process.stdin,
    output : process.stdout
});


ws.on("message", function(data) {
    console.log(data);
})


rl.on("line", function(line) {
    ws.send(line);
})




