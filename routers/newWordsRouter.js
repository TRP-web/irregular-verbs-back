import { Router } from "express";
import { findArrayNewWrods, findArrayWords } from "../functions/findFunctions.js";

const newWordsRouter = new Router()

newWordsRouter.get("/recommended", async (req, res) => {
    const newWordsData = await findArrayNewWrods("recommended", req)
    const wordsData = await findArrayWords(req)
    const result = newWordsData.NewWords.filter((newWord) => {
        const find = wordsData.words.find(elem => newWord.word == elem.word)
        if (find) {
            return false
        } else return true

        // wordsData.words.forEach(elem => {
        //     console.log(newWord.word, elem.word);
        //     if (respons !== false) {
        //         if (newWord.word == elem.word) {
        //             respons = false // remove
        //         } else {
        //             respons = true // add
        //         }
        //     } else return
        // }) -- it is bad --

    })
    res.status(200).json(result)
})

export default newWordsRouter