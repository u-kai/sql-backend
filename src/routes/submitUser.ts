import express from "express"
var mysql = require("mysql2/promise")
var router = express.Router()

router.post("/",(req:express.Request,res:express.Response) =>{
      const user:string = req.body.user
      const password:string = req.body.password
      const host:string = req.body.host
      const database:string = req.body.db
      const dbConfig = {
          user:user,
          password:password,
          host:host,
          database:database
      };
    (async()=>{
        await mysql.createConnection(dbConfig)
    })().then((results:any)=>{
        console.log(results)
        res.json({"results":results})})
    .catch((e)=>{
        console.log(e)
        res.json({"results":e})})
  }
)

    
module.exports = router;
