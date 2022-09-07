import { Router } from "express";
import NewWordsModule from "../shems/NewWords.js";
import UserPassportModel from "../shems/UserPassport.js";
import { wordsRecomended } from "../vars/words.js";

const newWordsRouter = new Router()
const findNewWrods = async (type, req) => {
    if (type === "recommended") {
        const user = await UserPassportModel.findOne({ email: req.body.verify.email })
        const result = await NewWordsModule.findById(user.NewWords._id)
        return result
    }
}
newWordsRouter.get("/recommended", async (req, res) => {
    const result = await findNewWrods("recommended", req)

    res.status(200).json(result.NewWords)
})

export default newWordsRouter