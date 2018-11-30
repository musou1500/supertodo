const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bearerToken = require("express-bearer-token");


var app = express();

app.use(logger("dev"));
app.use(bearerToken());
app.use(express.json());
app.use(cookieParser());


module.exports = app;
