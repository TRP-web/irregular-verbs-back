import { Router } from "express";
import UserPassportModel from "../shems/UserPassport.js";
import UserWordsModul from "../shems/userWords.js";

const wordsRouter = new Router()
const findArrayWords = async (req) => {
    const user = await UserPassportModel.findOne({ email: req.body.verify.email })
    const userWord = UserWordsModul.findById(user.UserWords)
    return userWord
}
wordsRouter.post("/add", async (req, res) => {
    // get User Words
    const userWords = await findArrayWords(req)
    // create word object
    const { word, v2, v3, translated } = req.body.data
    const newWord = { word, v2, v3, translated }
    // save word
    userWords.words.push(newWord)
    const saveResult = await userWords.save()
    //respons
    res.status(200).json(saveResult.words[saveResult.words.length - 1])

})

wordsRouter.get("/receive", async (req, res) => {
    const userWords = await findArrayWords(req)
    res.status(200).send(userWords.words)
})



export default wordsRouter