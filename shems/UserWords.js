import mongoose from "mongoose";

const UserWord = mongoose.Schema({
    word: {type: String},
    v2: {type: String},
    v3: {type: String},
    translated: {type: String},
})

const UserWords = mongoose.Schema({
   words: {type: [UserWord]}
})


const UserWordsModul = mongoose.model("UserWords", UserWords)

export default UserWordsModul