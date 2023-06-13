const mongoose = require('mongoose')

const currencySchema = new mongoose.Schema({
    name: String,
    USD: Number,
    UAH: Number,
    EUR: Number,
})

const Currency = mongoose.model("Currency", currencySchema)

module.exports = Currency