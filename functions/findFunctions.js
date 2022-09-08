import NewWordsModule from "../shems/NewWords.js"
import UserPassportModel from "../shems/UserPassport.js"
import UserWordsModul from "../shems/userWords.js"


export const findArrayNewWrods = async (type, req) => {
    if (type === "recommended") {
        const user = await UserPassportModel.findOne({ email: req.body.verify.email })
        const result = await NewWordsModule.findById(user.NewWords._id)
        return result
    }
}


export const findArrayWords = async (req) => {
    const user = await UserPassportModel.findOne({ email: req.body.verify.email })
    const userWord = UserWordsModul.findById(user.UserWords)
    return userWord
}