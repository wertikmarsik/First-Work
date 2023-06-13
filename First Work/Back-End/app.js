var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var session = require('express-session')
var mongoose = require('mongoose');
var db = require('./database')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./routes/google')
var passport = require('passport')

var usersRouter = require('./routes/userRoute');
var transactionsRouter = require('./routes/transactionsRoute')
var currencyRouter = require('./routes/currencyRoute')

var app = express();

app.use(session({secret: "crypto"}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.send('<a href="/auth/google"> ASDSADsadsadsa</a>')
})

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
)

app.get('/google/callback',
    passport.authenticate('google',
        {
            successRedirect: 'http://localhost:3001/my',
            failureRedirect: '/auth/failure'
        })
)

app.get('/auth/failure', (req, res) => {
    res.send("Something go wrong")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/user', usersRouter);
app.use('/api/transactions', transactionsRouter)
app.use('/api/currencies', currencyRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
