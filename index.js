import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import regRouter from "./routers/registrationRouter.js"


const app = express()
const DB_URL = "mongodb://31.172.75.19:27017/verbs"
const PORT = 22008
export const secret = "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"

app.use(express.json())
app.use(cors())
app.use("/user", regRouter)

app.get("/test", (req, res) => {
    res.status(200).json({ fun: "have" })
})

const serverStart = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => console.log("db had connected"))
        app.listen(PORT, () => console.log(`sever: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

serverStart()