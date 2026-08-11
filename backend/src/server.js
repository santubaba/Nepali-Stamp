const express = require("express")

const app = express()

app.get("/",(req,res)=>{
    res.json({message:"Backend is running"})
})


const PORT = 5000

app.listen(PORT,()=>{
    console.log(`Server should be running on https://localhost:${PORT}`)
})