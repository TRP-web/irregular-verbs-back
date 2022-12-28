import NewWordsModule from "../shems/NewWords.js"
import UserPassportModel from "../shems/UserPassport.js"
import UserWordsModul from "../shems/UserWords.js"

class Find {
    arrayNewWrods = async (type, req) => {
        if (type === "recommended") {
            const user = await UserPassportModel.findOne({ email: req.body.verify.email })
            const result = await NewWordsModule.findById(user.NewWords._id)
            return result
        }
    }

    arrayWords = async (req) => {
        const user = await UserPassportModel.findOne({ email: req.body.verify.email })
        const userWord = UserWordsModul.findById(user.UserWords)
        return userWord
    }
}

export default new Find()