const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bearerToken = require("express-bearer-token");

const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
const tagsRouter = require("./routes/tags");
const usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(bearerToken());
app.use(express.json());
app.use(cookieParser());

app.use("/tasks", tasksRouter);
app.use("/auth", authRouter);
app.use("/tags", tagsRouter);
app.use("/users", usersRouter);

module.exports = app;
