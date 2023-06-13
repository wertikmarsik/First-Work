var passport = require('passport')
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const {User} = require("../database");
const {response} = require("express");
var GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "1009093503756-ph1i1edchjhb6n0rfeq6lgl09ai0h2va.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

function generateRandomString(length) {
    const bytes = Math.ceil(length / 2);
    return crypto.randomBytes(bytes).toString('hex').slice(0, length);
}

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done(null, profile);

    }
));

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})