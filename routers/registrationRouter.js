import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import UserPassportModel from "../shems/UserPassport.js";

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
    try {
        const { name, email, picture, sub } = await verifyToken(clientId, req.body.token)

        const UserPassport = new UserPassportModel(
            { name: name, email: email, picture, sub: sub }
        )

        await UserPassport.save(err => {
            if (err) console.log(err)
        })

        console.log(UserPassport)
        res.status(200).json({
            ...UserPassport._doc,
            serverMessage: "good reqvest"
        })
    } catch (e) {

    }
})

export default regRouter