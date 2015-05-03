process.env.NODE_ENV = "development";

var express = require("./config/express"),
    mongoose = require("./config/mongoose");

var db = mongoose();
var app = express();

app.listen(24000);

console.log("Server listening at http://localhost:24000");

module.exports = app;
