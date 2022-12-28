import { verifyToken } from "../functions/verifyToken.js"

export const tokenTestMiddle = async (req, res, next) => {
    // console.log(req.header("token"))
    if (req.header("token")) {
        const verifyResult = await verifyToken(req.header("token"))
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