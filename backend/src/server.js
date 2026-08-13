require("dotenv").config()

const express = require("express")

const testRoutes = require("./routes/testRoute")

const app = express()

app.use("/api/test",testRoutes)

app.get("/",(req,res)=>{
    res.json({message:"Backend is running"})
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server should be running on http://localhost:${PORT}`)
})