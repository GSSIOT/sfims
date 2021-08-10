const express = require("express");
const { ConsoleTransportOptions } = require("winston/lib/winston/transports");

const app = express();


app.listen("1235", () => {console.log("server running")});

app.get("/test", function(req, res) {
    console.log(req);
    res.send("hi");
})



import express from 'express';