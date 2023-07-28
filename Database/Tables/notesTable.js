const mssql=require('mssql')

const createNotesTable=async(req,res)=>{
    try {
        const table=`BEGIN 
        TRY
        CREATE TABLE notesTable(
            id VARCHAR(50) PRIMARY KEY,
            note_title VARCHAR(50) NOT NULL,
            note_content VARCHAR(100) NOT NULL,
            creation_time TIMESTAMP NOT NULL
        )
        END TRY
        BEGIN
        CATCH
        THROW 50001, 'Table is in existence',1
        END CATCH`
        const pool=await mssql.connect(sqlConfig)
        await pool.query(table,(err)=>{
            if(err instanceof mssql.RequestError){
                console.log({Error:err.message})
            }else{
                console.log('Notes Table created Succesfuly')
            }
        })
    } catch (error) {
       res.json({Error:error })

    }
}

module.exports={
    createNotesTable
}