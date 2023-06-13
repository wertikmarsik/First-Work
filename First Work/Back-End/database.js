const mongoose = require('mongoose');
const User = require("./models/user")
const Currency = require("./models/currency")
const Wallet = require("./models/wallet")
const Transactions = require("./models/transactions")
const Token = require("./models/token")

mongoose.connect("mongodb+srv://wertikmarsik:Svetik192837465AB@cluster0.0csoz1w.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("Connected")).catch(() => console.log("Error"));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', () => {
    console.log('Connected to MongoDB database');
});


module.exports = {db, User, Currency, Wallet, Transactions, Token};