//Lead Author: Emma Christie
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var models = require('../model/fitfriend-model');
var validator = require('validator');

module.exports = function(passport){
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
        process.nextTick(function() {
          // check to see if theres already a user with that username (all usernames are lowercase)
          var un = username.toLowerCase();
          un = validator.toString(un);
          var email = req.body.email;
          if(!validator.isEmail(validator.toString(email))) return done(null,false, "Your email is not in the correct form!");
          //server side username regex check
          if (/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]?)*$/.test(un) !== true || un == "undefined"){
            return done(null, false, 'Your username is of an invalid format! Your username must begin with a letter and can contain numbers, letters, periods and underscores.');
          }
          
          var idx = email.lastIndexOf('@');
          // false if the address doesn't end with mit.edu or doesnt have @
          if (idx <= -1 || email.slice(idx) !== '@mit.edu') {
            return done(null, false, 'You must use a valid MIT email address to sign up for FitFriends!');
          }
          models.User.findOne({ 'local.username' :  un }, function(err, user) {
              // if there are any errors, return the error
              if (err) return done({error:err});
              if (user) return done(null, false, 'This username is already in use!');
              else {
                  // if there is no user with that email create the user
                  var newUser = new models.User();
                  var p = password;
                  bcrypt.genSalt(10, function(err, salt) {
                      bcrypt.hash(p, salt, function(err, hash) {
                          var newUser = new models.User({local:{password: hash, username: un}, email: email});
                          newUser.save(function (err, product, numberAffected){
                            if (err){
                              return done(null, false, err);
                            } else{
                              return done(null, newUser);
                            }
                          });
                    });
                  });
              }
          });    
        });
  }));
  
  //log in the user if the username/password combination is valid, otherwise return an error.
  passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, username, password, done) { 
        //check if account with email exists
        var un = username.toLowerCase();
        un = validator.toString(un);
        password = validator.toString(password);
        models.User.findOne({ 'local.username' :  un }, function(err, user) {
            if (err) return done({error:err});
            if (!user) {
              return done(null, false, {error:'Your username or password is incorrect.'}); 
            }
            else {
              bcrypt.compare(password, user.local.password, function(err, matches) {
                if (err) return done({'error':err});
                if(matches) return done(null, user);
                else return done(null, false, {error:'Your username or password is incorrect.'});
            });
        }
    })
  }
));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};