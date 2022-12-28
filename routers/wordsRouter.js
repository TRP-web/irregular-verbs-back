import { Router } from "express";
import Find from "../functions/Find.js";
import { saveModels } from "../functions/saveModels.js";
import UserWordsModul from "../shems/UserWords.js";

const wordsRouter = new Router()

wordsRouter.post("/add", async (req, res) => {
    try {
        // get User Words
        const userWords = await Find.arrayWords(req)
        // create word object
        const {
            word,
            v2,
            v3,
            translated,
            description,
            example,
            statistics
        } = req.body.data
        const newWord = {
            word,
            v2,
            v3,
            translated,
            description,
            example,
            statistics
        }
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
        const userWords = await Find.arrayWords(req)
        res.status(200).send(userWords.words)
    } catch (error) {
        console.log(error)
    }

})

wordsRouter.delete("/delete", async (req, res) => {
    try {
        const deleteId = req.body.deleteId
        const userWords = await Find.arrayWords(req)
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

wordsRouter.put("/update-statistics", async (req, res) => {
    try {
        //maybe need a type parameter 
        const word = req.body.word
        const type = req.body.type
        const userWords = await Find.arrayWords(req)
        const updateUserWords = await UserWordsModul.findById(userWords._id)
        // const find = updateUserWords.words.find(wordInfo => wordInfo.word === word.word)
        // console.log(find)
        updateUserWords.words.forEach((element, index) => {
            if (element.word === word.word) {
                const turgetWordStat = updateUserWords.words[index].statistics
                if (type) {
                    turgetWordStat[0] = turgetWordStat[0] + 1
                } else {
                    turgetWordStat[1] = turgetWordStat[1] + 1
                }
            }

        });
        await saveModels([updateUserWords])
        // console.log(updateUserWords)
        // console.log(word)

        res.status(200).json(word)
    } catch (e) {
        console.log(e)
    }
})



export default wordsRouter