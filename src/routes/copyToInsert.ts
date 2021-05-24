import { removeEmitHelper } from "typescript"
import express from "express"


var router = express.Router()
var mysql = require("mysql2/promise")





type PostData = { 
    tableName:string
    multiLineCells:{[key:string]:string}[]
    dbInfo:{
        user:string
        host:string
        password:string
        database:string
    }
}
const removeLastComma = (str:string):string=>{
    return str.substr(0,str.length-1)
}
router.post("/",(req,res)=>{
    const sendData:PostData = req.body
    const dbConfig = req.body.dbInfo
    const columns = Object.keys(sendData.multiLineCells[0])
    let values = ""
    let initSql = `INSERT INTO ${sendData.tableName} (${columns.join(",")})`
    let sql = initSql
    let sqls:string[] = []
    let errorList:any = [];
    let resultList:any = [];
        sendData.multiLineCells.map((columnValue)=>{
            columns.map((column)=>{
                if(columnValue[column] === ""){
                    values += "null,"
                }else{
                    values += `'${columnValue[column]}',`
                }
                
            })
            values = removeLastComma(values)
            sql = `${initSql} VALUES (${values})`
            console.log(sql)
            sqls = [...sqls,sql]
            values=""
        });
        (async()=>{
            for(let sqlIndex in sqls){
                try{
                    const connection = await mysql.createConnection(dbConfig)
                    await connection.query(sqls[sqlIndex]).then((data:any)=>{resultList = [...resultList,data]})
                    // values=""
                }catch(e){
                    console.log("errorrrrrrrrr" ,e)
                    errorList = [...errorList,e]
                }
            }
            res.json({"results":resultList,"error":errorList})
        })()      
})

module.exports = router;