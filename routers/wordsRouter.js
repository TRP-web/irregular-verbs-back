import { Router } from "express";

const wordsRouter = new Router()

wordsRouter.post("/add", async (req, res) => {
    res.status(200).json({fan: "have"})
})

wordsRouter.get("/add2", async (req, res) => {
    res.status(200).json({...req.body.verify, fan: "have"})
})

export default wordsRouter