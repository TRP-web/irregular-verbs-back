import express from "express"
import fs from "fs"
import https from "https"
import cors from "cors"
import mongoose from "mongoose"
import regRouter from "./routers/registrationRouter.js"
import wordsRouter from "./routers/wordsRouter.js"
import { tokenTestMiddle } from "./middleware/tokenTestMiddle.js"
import newWordsRouter from "./routers/newWordsRouter.js"
const privateKey = fs.readFileSync("./ssl/trp-web.key")
const certificate = fs.readFileSync("./ssl/trp-web.crt")

console.log(privateKey)
const app = express()

const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app)

const DB_URL = "mongodb://31.172.75.19:27017/verbs"
const PORT = 22008
export const secret = "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"
export const clientId = "297750495683-im2hja8uvhhopfjp3rl0g0plkdplvoqf.apps.googleusercontent.com"

app.use(express.json())
app.use(cors())
app.use("/user", tokenTestMiddle, regRouter)
app.use("/words", tokenTestMiddle, wordsRouter)
app.use("/new-words", tokenTestMiddle, newWordsRouter)

app.get("/test", (req, res) => {
    console.log("send")
    res.send("https thare working")
})

const serverStart = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => console.log("db had connected"))
        httpsServer.listen(PORT, () => console.log(`sever: ${PORT}`))
    } catch (e) {
        console.log(e, "error")
    }
}

serverStart()