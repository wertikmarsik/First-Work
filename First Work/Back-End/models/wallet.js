const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema({
    BTC: {
        type: Number,
        default: 0
    },
    ETH: {
        type: Number,
        default: 0
    },
    LTC: {
        type: Number,
        default: 0
    },
})

const Wallet = mongoose.model("Wallet", walletSchema)

module.exports = Wallet