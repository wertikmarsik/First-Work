var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var Wallet = require('../models/wallet');
var Currency = require('../models/currency');
var Transactions = require('../models/transactions')
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Joi = require("joi");
const Token = require("../models/token");
const sendEmail = require('./sendEmail')


const secretKey = "Crypto2281337"

function generateRandomString(length) {
    const bytes = Math.ceil(length / 2);
    return crypto.randomBytes(bytes).toString('hex').slice(0, length);
}

router.post('/register', async (req, res) => {
    const {email, username, surname, password} = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            username,
            surname,
            password: hashedPassword,
            referalCode: generateRandomString(100)
        })
        await newUser.save()

        const newWallet = new Wallet()
        await newWallet.save()

        newUser.wallet = newWallet._id
        await newUser.save()

        res.status(201).json({message: "User registered Successfully"})
    } catch (err) {
        res.status(400).json({error: err.message})
    }

})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if (!user) {
        return res.status(404).json({error: "User with this email not found"})
    }

    if (!password) {
        return res.status(400).json({error: "password can't be null"})
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
        return res.status(401).json({error: "Invalid password"})
    }

    const token = jwt.sign({userId: user._id}, secretKey)

    res.status(200).json({token})

})

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

router.get('/profile', authMiddleware, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, secretKey)
    const userId = decodedToken.userId
    await User.findById(userId)
        .then((user) => {
            res.json(user)
        })
        .catch((error) => {
            console.log("Error", error)
            res.status(400).json({error: error.message})
        })
})

router.patch('/update', authMiddleware, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        if (req.body.password) {
            var hashedPassword = await bcrypt.hash(req.body.password, 10)
        }

        user.username = req.body.username || user.username;
        user.surname = req.body.surname || user.surname;
        user.email = req.body.email || user.email;
        user.password = hashedPassword || user.password;
        user.avatar = req.body.avatar || user.avatar;

        await user.save();

        res.status(200).json({message: 'User updated successfully', user});
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});

router.post('/purchase', authMiddleware, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const {currencyName, quantity, secondCurrencyName} = req.body


    try {
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const name = req.body.currencyName

        const newCurrency = await Currency.findOne({name})

        if (!newCurrency) {
            return res.status(404).json({error: "Can not find a currency"})
        }

        const wallet = await Wallet.findById(user.wallet)

        currencyValue = newCurrency[secondCurrencyName] * quantity
        console.log(currencyValue)

        userValue = user[secondCurrencyName]
        console.log(userValue)

        walletValue = wallet[currencyName]
        console.log(walletValue)

        if (userValue >= currencyValue) {
            userValue -= currencyValue
            console.log(userValue)
            user[secondCurrencyName] = userValue

            walletValue += quantity
            console.log(walletValue)
            wallet[currencyName] = walletValue
            const newTransaction = await new Transactions({
                type: "Received",
                quantity: req.body.quantity,
                currency: req.body.currencyName,
                status: "Completed",
                user: userId
            })
            newTransaction.save()
            user.save()
            wallet.save()
            return res.status(200).json({message: "Successfully Received"})
        } else {
            return res.status(400).json({error: "Not enough money"})
        }


    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
router.post('/sell', authMiddleware, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const {currencyName, quantity, secondCurrencyName} = req.body


    try {
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const name = req.body.currencyName

        const newCurrency = await Currency.findOne({name})

        if (!newCurrency) {
            return res.status(404).json({error: "Can not find a currency"})
        }

        const wallet = await Wallet.findById(user.wallet)

        walletValue = wallet[currencyName]
        console.log(walletValue)
        userValue = user[secondCurrencyName]
        console.log(userValue)
        currencyValue = newCurrency[secondCurrencyName] * quantity
        console.log(currencyValue)

        if (walletValue < quantity) {
            return res.status(400).json({error: "Not enough currency"})
        } else {
            wallet[currencyName] = walletValue -= quantity
            user[secondCurrencyName] = userValue += currencyValue

            const newTransaction = await new Transactions({
                type: "Exchanged",
                quantity: req.body.quantity,
                currency: req.body.currencyName,
                status: "Completed",
                user: userId
            })
            newTransaction.save()

            wallet.save()
            user.save()
            return res.status(200).json({message: "Successfully exchanged"})
        }
        console.log(walletValue)


    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
router.post('/exchange', authMiddleware, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const {currencyName, quantity, referalCode} = req.body


    try {
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const wallet = await Wallet.findById(user.wallet)

        walletValue = wallet[currencyName]
        console.log(walletValue)

        if (!referalCode) {
            return res.status(400).json({error: 'Can not find user without referal code'})
        }
        const secondUser = await User.findOne({referalCode})
        const secondWallet = await Wallet.findById(secondUser.wallet)
        secondWalletValue = secondWallet[currencyName]
        console.log(secondWalletValue)

        if (!secondUser) {
            return res.status(404).json({error: "User with this referal code not found"})
        }

        if (walletValue < quantity) {
            return res.status(400).json({error: "Not enough currency"})
        } else {
            wallet[currencyName] = walletValue -= quantity
            secondWallet[currencyName] = secondWalletValue += quantity

            const newTransaction = await new Transactions({
                type: "Sent",
                quantity: req.body.quantity,
                currency: req.body.currencyName,
                status: "Completed",
                user: userId
            })
            newTransaction.save()

            wallet.save()
            secondWallet.save()
            return res.status(200).json({message: "Successfully sent"})
        }

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.post('/reset-password', async (req, res) => {
    try {
        const schema = Joi.object({email: Joi.string().email().required()})
        const {error} = schema.validate(req.body)
        if (error) return res.status(400).json({error: error})

        const user = await User.findOne({email: req.body.email})
        console.log(user._id)
        if (!user) return res.status(404).json({error: "User not found"})

        let token = await Token.findOne({userId: user._id})
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex')
            }).save()
        }

        const link = `http://localhost:3000/user/password-reset/${user._id}/${token.token}`
        await sendEmail(user.email, "password reset", link)

        res.status(200).json({meesage: "Password reset link sent to your email account."})

    } catch (error) {
        res.status(400).json({error: error})
    }
})

router.post("/:userId/:token", async (req, res) => {
    try {
        const schema = Joi.object({password: Joi.string().required()})
        const {error} = schema.validate(req.body)
        if (error) {
            return res.status(400).json({error: error})
        }

        const user = await User.findById(req.params.userId)
        console.log(user._id)
        if (!user) {
            return res.status(400).json({error: "Invalid link or expired"})
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })

        if (!token) {
            return res.status(400).json({error: "Invalid link or expired"})
        }
        hashedPassword = await bcrypt.hash(req.body.password, 10)
        user.password = hashedPassword
        user.save()

        res.status(200).json({message: "Password reset successfully"})

    } catch (error) {
        res.status(400).json({error: error})
    }
})


module.exports = router;
