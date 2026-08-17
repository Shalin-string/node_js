const express = require("express")

const app = express()


app.get("/first", (req,res)=>{
    console.log("First api called...");
    res.send({name:"Shalin",age:20})
    
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Port stated on port ${PORT}`)
})