var express = require('express');
const jwt = require("jsonwebtoken");
const Currency = require("../models/currency");
var router = express.Router();

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
// GET /api/currencies -- return all
// GET /api/currencies?name=BTC -- return BTC
// GET /api/currencies?name=LTC -- return LTC
// GET /api/currencies?name=ETH -- return ETH
router.get('', authMiddleware, async (req, res) => {
    try {
        const name = req.query.name;
        console.log(name)
        let currencies;

        if (!name) {
            currencies = await Currency.find({})
        } else {
            currencies = await Currency.findOne({name: name})
        }

        if (!currencies) {
            return res.status(404).json({error: 'Currencies not found'});
        }

        res.status(200).json({message: currencies});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router