"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require("cors");
// var express = require('express');
var app = express_1.default();
var session = require("express-session");
var sessionMiddleware = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxage: 1000 * 60 * 30
    }
});
app.use(sessionMiddleware);
app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var editerhandler = require("./routes/editerhandler");
var submitUser = require("./routes/submitUser");
var copyToCreate = require("./routes/copyToCreate");
var copyToInsert = require("./routes/copyToInsert");
var showTableColumn = require("./routes/showTableColumn");
var server = app.listen(8000, function () {
    console.log("start");
});
app.use("/showTableColumn", showTableColumn);
app.use("/editerhandler", editerhandler);
app.use("/submitUser", submitUser);
app.use("/copyToCreate", copyToCreate);
app.use("/copyToInsert", copyToInsert);
app.get("/", function (req, res) {
    res.sendFile("../../build/index.html");
});
module.exports = app;
