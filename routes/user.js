var express = require('express');
var router = express.Router();

var passport = require('passport');

var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

//Get user model
var User = require('../models/user');

var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('user/profile');
});

router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
  next();
});

router.get('/register', function(req, res, next) {
  res.render('user/register', {csrfToken: req.csrfToken()});
});
router.post('/register', function(req, res, next) {

  req.checkBody('username', 'Username cannot be blank').notEmpty();
  req.checkBody('password', 'Password must be more than 4 characters').notEmpty().isLength({min: 5});
  req.checkBody('firstname', 'Firstname cannot be blank').notEmpty();
  req.checkBody('lastname', 'Lastname cannot be blank').notEmpty();
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('telephone', 'Invalid phone number').notEmpty().isMobilePhone("any");
  var errors = req.validationErrors(true);
  if(errors) {
    var messages = [];
    for(var key in errors) {
      if(errors.hasOwnProperty(key)) 
        messages.push(errors[key].msg);
    }
    res.render('user/register', {errors: messages});
  }
  else {
    User.findOne({'username': req.body.username}, function(err, user) {
      if(err) return next(err);
      if(user) return next(new Error('Username already exist.'));
      User.findOne({'email': req.body.email}, function(err, user) {
        if(err) return next(err);
        if(user) return next(new Error('Email already exist.'));
        var newUser = new User();
        newUser.username = req.body.username;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.email = req.body.email;
        newUser.phone = req.body.telephone;
        newUser.billingAddress = req.body.billingaddress;
        newUser.shippingAddress = req.body.shippingaddress;
        newUser.isSubscribed = (req.body.issubscribed == 1) ? true : false;
        newUser.save(function(err, result) {
          if(err) return err;
          res.redirect('/user/login');
        });      
      });
    });
  }
});

router.get('/login', function(req, res, next) {
  res.render('user/login', {csrfToken: req.csrfToken()});
});
router.post('/login', passport.authenticate('local.login', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/login',
  failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/user/login');
}
function notLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) return next();
  res.redirect('/');
}