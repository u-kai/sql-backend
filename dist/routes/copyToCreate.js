"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var mysql = require("mysql2/promise");
var removeLastComma = function (str) {
    return str.substr(0, str.length - 1);
};
router.post("/", function (req, res) {
    var errorList = [];
    var resultList = [];
    var postData = req.body;
    var dbConfig = req.body.dbInfo;
    console.log(postData);
    var sql = "CREATE TABLE " + postData.tableName + " (";
    var dataDifine = "";
    var primaries = "";
    var multiLineCells = postData.multiLineCells;
    multiLineCells.map(function (oneLineCells) {
        dataDifine += oneLineCells["DataName"] + " " + oneLineCells["DataType"] + " " + oneLineCells["IsNull"] + " " + oneLineCells["Option"] + ",";
        if (oneLineCells.IsPrimary === "PRIMARY") {
            primaries += oneLineCells["DataName"] + ",";
        }
    });
    if (primaries.length < 1) {
        sql += removeLastComma(dataDifine) + ")";
    }
    else {
        sql += removeLastComma(dataDifine) + " , PRIMARY KEY (" + removeLastComma(primaries) + "))";
    }
    console.log(sql);
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4, mysql.createConnection(dbConfig)];
                case 1:
                    connection = _a.sent();
                    return [4, connection.query(sql).then(function (data) {
                            resultList = __spreadArray(__spreadArray([], resultList), [data]);
                            console.log(data);
                        })];
                case 2:
                    _a.sent();
                    return [3, 5];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    errorList = __spreadArray(__spreadArray([], errorList), [e_1.toString()]);
                    return [3, 5];
                case 4:
                    res.json({ "results": resultList, "error": errorList });
                    return [7];
                case 5: return [2];
            }
        });
    }); })();
});
module.exports = router;
//# sourceMappingURL=copyToCreate.js.map