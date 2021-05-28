import * as express from "express"
var router = express.Router()
var mysql = require("mysql2/promise")

router.post("/",(req:express.Request,res:express.Response)=>{
    const dbConfig :{
        user:string
        password:string
        host:string
        database:string
    } = req.body.dbInfo
    type SelectResult = {[key:string]:string|number|null}[][]
    type OtherResult  = {
        fieldCount:number
        affectedRows:number
        insertId:number
        info:string
        serverStatus: number
        warningStatus:number
        changedRows: number
    } []
    type SQLError = {code:string,sqlState:string,errno:number,sqlMessage:string}
    const querys:string[] = req.body.querys
    let errorList:SQLError[] = []
    let selectList:SelectResult = []
    let otherList:OtherResult = []

    const isSelect = (data:SelectResult|OtherResult):data is SelectResult => {
        return (data as SelectResult) != undefined
    }
    const executeQuery = async()=>{
        try{
            const connection = await mysql.createConnection(dbConfig)
            for(let i in querys){
                await connection.query(querys[i]).then((data:SelectResult|OtherResult)=>{
                    if(isSelect(data)){
                        selectList = [...selectList,data[0]]
                    }else{
                        otherList = [...otherList,data[0]]
                    }
                })
                .catch((e:SQLError)=>{
                    errorList = [...errorList,e]
                })
                
            }
            res.json({"select":selectList,"other":otherList,"error":errorList})
        }catch(e){
            console.log(e)
            res.json({"select":[[]],"other":otherList,"error":[e]})
        }
    }
    executeQuery()
    
    
})
module.exports = router;