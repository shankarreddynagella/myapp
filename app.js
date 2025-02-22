var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var models = require('./models');
//var db = models.sequelize.models;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let htmlPath = path.join(__dirname, 'public')

var app = express();

// view engine setup
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'pug');
app.use(express.static(htmlPath));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true,
    name:'simpleTest' 
  },
  secret: 'simpleTest123',
  name:'simpleTest'
}))
app.use(express.static(path.join(__dirname, 'public')));
var sessionChecker = (req, res, next) => {
  if (req.cookies.secret) {
     console.log(req.cookies.secret)
      //res.redirect('/dashboard');
  } else {
      next();
  }    
};


app.use('/', indexRouter);
app.use('/api/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
