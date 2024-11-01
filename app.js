var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routeurs
var usersRouter = require('./routes/users');
var concertsRouter = require('./routes/concerts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/users', usersRouter);
app.use('/', concertsRouter);

module.exports = app;
