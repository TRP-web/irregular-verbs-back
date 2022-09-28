import { Router } from "express";
import { saveModels } from "../functions/saveModels.js";
import NewWordsModule from "../shems/NewWords.js";
import UserPassportModel from "../shems/UserPassport.js";
import UserWordsModul from "../shems/UserWords.js";
import { wordsRecomended } from '../vars/words.js'
const regRouter = new Router()

// const test = await verifyToken(clientId, "test false token")
// console.log(test)

regRouter.post("/registration", async (req, res) => {
    try {
        const reqBody = req.body
        //has tested decod token
        const { name, email, picture, sub } = reqBody.verify
        //testing for repeat
        const testingForRepeat = await UserPassportModel.findOne({ email: email })
        if (testingForRepeat === null) {
            const UserWords = new UserWordsModul()
            const NewWords = await NewWordsModule()
            NewWords.NewWords = wordsRecomended
            const UserPassport = new UserPassportModel(
                { name: name, email: email, picture, sub: sub, UserWords: UserWords._id, NewWords: NewWords._id }
            )

            //saving user
            saveModels([UserPassport, UserWords, NewWords])

            await UserPassport.save(err => {
                if (err) console.log(err, "error")
            })
            //response to client
            res.status(200).json({
                ...UserPassport._doc,
                serverMessage: "good reqvest - add in bd"
            })
        } else {
            //response to client
            res.status(200).json({
                ...testingForRepeat._doc,
                severMessage: "good request - login succses"
            })
        }

    } catch (e) {
        console.log(e, "error")
    }


})

export default regRouter