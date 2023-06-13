const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
    },
    password: {
        type: String,
        required: true,
    },
    referalCode: {
      type: String,
      required: false
    },
    USD: {
        type: Number,
        default: 0.0,
    },
    UAH: {
        type: Number,
        default: 0.0,
    },
    EUR: {
        type: Number,
        default: 0.0,
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
    },
})

const User = mongoose.model("User", userSchema)

module.exports = User