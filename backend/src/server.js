require("dotenv").config()

const express = require("express")

const stampRoutes = require("./routes/stampRoutes")
const app = express()

app.use("/api/stamps", stampRoutes)
app.get("/",(req,res)=>{
    res.json({message:"Backend is running"})
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server should be running on http://localhost:${PORT}`)
})