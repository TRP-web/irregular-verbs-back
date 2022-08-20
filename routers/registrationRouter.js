import { Router } from "express";
import jwt from "jsonwebtoken";

const regRouter = new Router()

regRouter.post("/registration", async (req, res) => {
    try {
        const bodyReq = req
        const decodToken = jwt.decode(bodyReq.body.token)
        console.log(decodToken)
        res.status(200).json({
            decode: decodToken,
            serverMessage: "good reqvest"
        })
    } catch (e) {

    }
})

export default regRouter