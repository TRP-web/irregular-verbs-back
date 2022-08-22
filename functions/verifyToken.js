import { OAuth2Client } from "google-auth-library"
import { clientId } from "../index.js"

export const verifyToken = async (token) => {
    try {
        const client = new OAuth2Client(clientId)
        const tiket = await client.verifyIdToken({
            idToken: token,
            audience: clientId
        })
        const payload = tiket.getPayload()

        return payload
    } catch (e) {
        console.log(e)
    }
}