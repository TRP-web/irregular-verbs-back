import { Router } from "express";
import { wordsRecomended } from "../vars/words.js";

const newWordsRouter = new Router()

newWordsRouter.get("/recommended", async (req, res) => {
    res.status(200).json(wordsRecomended)
})

export default newWordsRouter