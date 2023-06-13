const mongoose = require('mongoose')

const transactionsSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Exchanged", 'Sent', "Received"],
        required: true
    },
    quantity: Number,
    currency: {
        type: String,
        enum: ["BTC", "ETH", "LTC"]
    },
    status: {
        type: String,
        enum: ["Requested", "Pending", "Completed"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Transactions = mongoose.model("Transactions", transactionsSchema)

module.exports = Transactions