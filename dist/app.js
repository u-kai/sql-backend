"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var cors = require("cors");
var app = express();
app.use(express.static(path.join(__dirname, "../build")));
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
    console.log("start server");
});
app.use("/showTableColumn", showTableColumn);
app.use("/editerhandler", editerhandler);
app.use("/submitUser", submitUser);
app.use("/copyToCreate", copyToCreate);
app.use("/copyToInsert", copyToInsert);
app.get("/", function (req, res) {
    res.sendFile("/index.html");
});
module.exports = app;
//# sourceMappingURL=app.js.map