const express=require("express")

const app=express()
const dotenv=require("dotenv").config()
const connectDB=require("./config/connectionDB")
const cors=require("cors")
const { use } = require("react")


const PORT=process.env.PORT || 3000 //normally process.envPORT  . if PORT is not available then use process.env.PORT || 3000
connectDB()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use("/",require("./routes/user"))
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.use("/recipe",require("./routes/recipe"))
app.listen(PORT,(err)=>{
    console.log(`app is listening on ${PORT}`)

})