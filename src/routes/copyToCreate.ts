import express from "express"
var router = express.Router()
var mysql = require("mysql2/promise")

type CreateTableData = {
    tableName:string
    columns:string[]
    dataTypes:string[]
    isPrimary:string[]
    options:string[]
}

type CreateTableDatatest = {
    tableName:string
    multiLineCells:[{
        DataName:string,
        DataType:string,
        IsPrimary:string,
        Option:string,
        IsNull:string
    }]
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
router.post("/",(req:express.Request,res:express.Response)=>{
    let errorList:string[] = []
    let resultList:{[key:string]:string}[][] = []
    const postData:CreateTableDatatest = req.body
    const dbConfig = req.body.dbInfo
    console.log(postData)
    let sql = `CREATE TABLE ${postData.tableName} (`
    let dataDifine = ""
    let primaries = ""
    const multiLineCells = postData.multiLineCells
    multiLineCells.map((oneLineCells)=>{
        dataDifine += `${oneLineCells["DataName"]} ${oneLineCells["DataType"]} ${oneLineCells["IsNull"]} ${oneLineCells["Option"]},`
        if(oneLineCells.IsPrimary === "PRIMARY"){
            primaries += `${oneLineCells["DataName"]},`
        }
    })
    if(primaries.length<1){
        sql += `${removeLastComma(dataDifine)})`
    }else{
        sql += `${removeLastComma(dataDifine)} , PRIMARY KEY (${removeLastComma(primaries)}))`
    }
    console.log(sql);
    (async()=>{
        try{
            const connection = await mysql.createConnection(dbConfig)
            await connection.query(sql).then((data:{[key:string]:string}[])=>{
                resultList = [...resultList,data]
                console.log(data)})
        }catch(e){console.log(e)
                 errorList=[...errorList,e.toString()]}
        finally{
            res.json({"results":resultList,"error":errorList})
        }})()   
})

module.exports = router;
