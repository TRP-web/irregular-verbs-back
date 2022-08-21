import mongoose from "mongoose";

const UserPassport = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    picture: { type: String },
    sub: { type: String }
})

const UserPassportModel = mongoose.model("UserPassport", UserPassport)

export default UserPassportModel