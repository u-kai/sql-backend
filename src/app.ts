import * as express from "express"
import * as path from "path"
const cors = require("cors")

const app = express();
app.use(express.static(path.join(__dirname,"../build")))
// var session = require("express-session")
// var sessionMiddleware = session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie:{
//     httpOnly: false,
//     secure: false,
//     maxage: 1000 * 60 * 30
//   }});


// app.use(sessionMiddleware);
app.use(cors())
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var editerhandler = require("./routes/editerhandler")
var submitUser = require("./routes/submitUser")
var copyToCreate = require("./routes/copyToCreate")
var copyToInsert = require("./routes/copyToInsert")
var showTableColumn = require("./routes/showTableColumn")
var server = app.listen(8000, function(){
    console.log("start server")
});

app.use("/showTableColumn",showTableColumn)
app.use("/editerhandler",editerhandler)
app.use("/submitUser",submitUser)
app.use("/copyToCreate",copyToCreate)
app.use("/copyToInsert",copyToInsert)



app.get("/",(req:express.Request,res:express.Response)=>{
    res.sendFile("/index.html")
})

module.exports = app

