import mongoose from "mongoose";

const NewWord = mongoose.Schema({
    word: { type: String },
    v2: { type: String },
    v3: { type: String },
    translated: { type: String },
    description: { type: String },
    example: { type: [String] },
    statistics: { type: [Number] }
})

const NewWords = mongoose.Schema({
    NewWords: { type: [NewWord] }
})

const NewWordsModule = mongoose.model("NewWords", NewWords)

export default NewWordsModule