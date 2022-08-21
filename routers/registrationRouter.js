import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const regRouter = new Router()
const clientId = "297750495683-im2hja8uvhhopfjp3rl0g0plkdplvoqf.apps.googleusercontent.com"


const verifyToken = async (clId, token) => {
    try {
        const client = new OAuth2Client(clId)
        const tiket = await client.verifyIdToken({
            idToken: token,
            audience: clId
        })
        const payload = tiket.getPayload()
        return payload
    } catch (e) {
        console.log(e)
    }
}

regRouter.post("/registration", async (req, res) => {
    const verifyDecod = await verifyToken(clientId, req.body.token)
    try {
        res.status(200).json({
            ...verifyDecod,
            serverMessage: "good reqvest"
        })
    } catch (e) {

    }
})

export default regRouter