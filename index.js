import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
const DB_URL = "mongodb://31.172.75.19:27017/verbs"
const PORT = 22008

app.use(express.json())
app.use(cors())

app.get("/test", (req, res) => {
    res.status(200).json({ fun: "have" })
})

const serverStart = async () => {
    try {
        app.listen(PORT, () => console.log(`sever: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

serverStart()