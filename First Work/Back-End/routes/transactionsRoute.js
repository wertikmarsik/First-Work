var express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();
var Transactions = require('../models/transactions')


const secretKey = "Crypto2281337"

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json({error: "Unauthorized"})
    }

    try {
        const decodedToken = jwt.verify(token, secretKey)
        req.user = decodedToken.user
        next()
    } catch (error) {
        res.status(401).json({error: "Unauthorized"})
    }
}
// TODO:
// create one route to handle next cases
// GET /api/transactions -- return all
// GET /api/transactions?limit=<number> -- return transaction with limit number
router.get('', authMiddleware, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const limit = req.query.limit;

    try {
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;

        let transactions;

        if (limit) {
            transactions = await Transactions.find({user: userId}).limit(parseInt(limit));
        } else {
            transactions = await Transactions.find({user: userId});
        }

        if (!transactions) {
            return res.status(404).json({error: 'Transactions not found'});
        }

        res.status(200).json({message: transactions});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


module.exports = router;
