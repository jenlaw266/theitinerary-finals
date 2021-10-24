const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const App = express();
App.use(cors());

App.use(logger('dev'));
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cookieParser());
App.use(express.static(path.join(__dirname, 'public')));

App.use('/', indexRouter);
App.use('/users', usersRouter);

module.exports = App;
