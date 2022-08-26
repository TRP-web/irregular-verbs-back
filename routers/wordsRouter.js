import { Router } from "express";
import { saveModels } from "../functions/saveModels.js";
import UserPassportModel from "../shems/UserPassport.js";
import UserWordsModul from "../shems/userWords.js";

const wordsRouter = new Router()
const findArrayWords = async (req) => {
    const user = await UserPassportModel.findOne({ email: req.body.verify.email })
    const userWord = UserWordsModul.findById(user.UserWords)
    return userWord
}
wordsRouter.post("/add", async (req, res) => {
    try {
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
    } catch (e) {
        console.log(e)
    }
})

wordsRouter.get("/receive", async (req, res) => {
    try {
        const userWords = await findArrayWords(req)
        res.status(200).send(userWords.words)
    } catch (error) {
        console.log(error)
    }

})

wordsRouter.delete("/delete", async (req, res) => {
    try {
        const deleteId = req.body.deleteId
        const userWords = await findArrayWords(req)
        const updateUserWords = await UserWordsModul.findOneAndUpdate(
            { _id: userWords._id },
            { $pull: { words: { _id: deleteId } } },
            { new: true }
        )

        await saveModels([updateUserWords])
        res.status(200).json({
            have: "fan",
            delete: "succes"
        })

    } catch (e) {
        console.log(e)
    }

})



export default wordsRouter