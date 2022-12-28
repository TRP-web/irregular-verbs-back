import { OAuth2Client } from "google-auth-library"

export const verifyToken = async (token) => {
    try {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const tiket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        const payload = tiket.getPayload()
        return payload
    } catch (e) {
        console.log(e)
    }
}