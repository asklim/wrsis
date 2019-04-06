"use strict";
require('dotenv').load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
//passport before dbs-models

var dbs = require('../api/databases/databases');
dbs.createConns();

require('../api/passport'); //after db create models

//debug/statistic info for Mongo DB
//var dbInfo = require('./api/models/dbinfo');
//dbInfo.log(mongoose.connection);

// console.log(dbs.getDB('config').client.s);
// console.log(dbs.getDB('Temp').client.s);

var indexRouter = require('./routes/index-router');
var usersRouter = require('./routes/users-router');
var apiRouter = require('../api/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, /*'server',*/ 'views'));
app.set('view engine', 'ejs');

app.use((req,res,next) => {
    requestInfo2console(req);
    next();
});

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + './../public/favicon.ico'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './../public')));
app.use(express.static(path.join(__dirname, './../static')));

app.use(passport.initialize());

app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404), req, res);
});

// error handler
app.use(function(err, req, res) { //, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    console.log(`app-server error-handler: env='${req.app.get('env')}'`);
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


function requestInfo2console(req) {
    console.log(`Received request: ${req.method} ${req.url}`);  
    //+ ` from ${req.headers['user-agent']}`);
}

