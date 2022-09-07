import mongoose from "mongoose";

const UserPassport = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    picture: { type: String },
    sub: { type: String },
    UserWords: { type: mongoose.Schema.Types.ObjectId, ref: "UserWords" },
    NewWords: { type: mongoose.Schema.Types.ObjectId, ref: "NewWords" }
})

const UserPassportModel = mongoose.model("UserPassport", UserPassport)

export default UserPassportModel