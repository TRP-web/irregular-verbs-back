import { verifyToken } from "../functions/verifyToken.js"

export const registrationMiddle = async (req, res, next) => {
    if (req.body.token) {
        const verifyResult = await verifyToken(req.body.token)
        if (verifyResult !== undefined) {
            req.body.verify = verifyResult
           next()
        } else res.status(400).json({
            serverMessage: "bed token"
        })

    } else res.status(400).json({
        severMessage: "token is require"
    })
}