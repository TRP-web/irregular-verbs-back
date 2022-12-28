import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import express from "express"
import fs from "fs"
import https from "https"
import cors from "cors"
import mongoose from "mongoose"
import regRouter from "./routers/registrationRouter.js"
import wordsRouter from "./routers/wordsRouter.js"
import { tokenTestMiddle } from "./middleware/tokenTestMiddle.js"
import newWordsRouter from "./routers/newWordsRouter.js"

const app = express()


app.use(express.json())
app.use(cors())
app.use("/user", tokenTestMiddle, regRouter)
app.use("/words", tokenTestMiddle, wordsRouter)
app.use("/new-words", tokenTestMiddle, newWordsRouter)

app.get("/test", (req, res) => {
    res.status(200).json({ have: "fan" })
})

const serverStart = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => console.log("db had connected"))
        if (process.env.PROJECT_STATUS === "developing") {
            app.listen(22008, () => console.log(`sever: ${process.env.PORT}`))
        } else if (process.env.PROJECT_STATUS === "working") {
            const privateKey = fs.readFileSync("./ssl/trp-web.key")
            const certificate = fs.readFileSync("./ssl/trp-web.crt")
            const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app)
            httpsServer.listen(process.env.PORT, () => console.log(`sever: ${process.env.PORT}`))
        }

    } catch (e) {
        console.log(e, "error")
    }
}

serverStart()
console.log(process.env.DB_URL)