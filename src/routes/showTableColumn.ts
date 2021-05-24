import express from "express"
var router = express.Router()
var mysql = require("mysql2/promise")

type PostData = { 
    tableName:string
    dbInfo:{
        user:string
        host:string
        password:string
        database:string
    }
}

router.post("/",(req:express.Request,res:express.Response)=>{
    const sendData:PostData = req.body
    const dbConfig = req.body.dbInfo
    const tableName = sendData.tableName
    const sql = `SHOW COLUMNS FROM ${tableName}`
    console.log(sql)
    let result = ""
    try{(async()=>{
        const connection = await mysql.createConnection(dbConfig)
        await connection.query(sql).then((data:{[key:string]:string}[][])=>{
            console.log(data)
            res.json({"results":data,"error":[{}]})
        })
            }
        )().catch((e)=>{console.log(e)
                    res.json({"results":[[{}]],"error":[e]})})
    }catch(e){
        result = e
        console.log(e)
    }
    })



module.exports = router;