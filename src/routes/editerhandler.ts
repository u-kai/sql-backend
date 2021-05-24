import express from "express"
var router = express.Router()
var mysql = require("mysql2/promise")

router.post("/",(req:express.Request,res:express.Response)=>{
    const dbConfig = req.body.dbInfo
    const querys:string[] = req.body.querys
    let errorList:string[] = []
    let selectList:{[key:string]:string}[][] = []
    let otherList:{[key:string]:string}[][] = []
    // type Data = {
    //     :{[key:string]:string}[][]|{[key:string]:string}[]
    // }
    const selectRe:RegExp = /.*select.*/i
    const executeQuery = async()=>{
        try{
            const connection = await mysql.createConnection(dbConfig)
            for(let i in querys){
                await connection.query(querys[i]).then((data:any)=>{
                    if(selectRe.test(querys[i])){
                        selectList.push(data[0])
                    }else{
                        if(data[0].length === undefined){
                            otherList.push([data[0]])
                        }else{
                            otherList.push(data[0])
                            console.log(data[0])
                        }  
                    }  
                })
                .catch((e:string)=>{
                    console.log(e)
                    errorList.push(e)
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