var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

var fs = require('fs');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodejsshop', { useMongoClient: true });

require('./config/passport');

var index = require('./routes/index');
var userroutes = require('./routes/user');
var shoproutes = require('./routes/shop');

var app = express();

// view engine setup
var hbsHelpers = expressHbs.create({
  helpers: require("./helpers/handlebars.js").helpers,
  defaultLayout: 'layout',
  extname: '.hbs'
});
app.engine('.hbs', hbsHelpers.engine);
app.set('view engine', '.hbs');

//Get categories to populate menu bar in header
var jsonPath = path.join(__dirname, '.', 'public', 'data', 'categories.json');
var jsonData = {"categories":{}};
fs.readFile(jsonPath, 'utf8', function (err, data) {
  if (err) console.log(err);
  else {
    jsonData = JSON.parse(data);
    app.locals.categories = jsonData.categories;
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.locals.loggedin = req.isAuthenticated();
  if(res.locals.loggedin) 
    res.locals.loggedinUser = req.user.username;
  res.locals.session = req.session;
  next();
});

app.use('/user', userroutes);
app.use('/shop', shoproutes);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
