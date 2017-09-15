var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, username, password, done) {
  User.findOne({'username': username}, function(err, user) {
    if(err) return done(err);
    if(!user) return done(null, false, {message: 'Username does not exist.'});
    if(!user.validPassword(password)) return done(null, false, {message: 'Wrong password.'});
    return done(null, user);
  });

}));
