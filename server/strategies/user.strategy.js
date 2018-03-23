var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');

// Store this user's unique id in the session for later reference
// Only runs during authentication
// Stores info on req.session.passport.user
passport.serializeUser(function(user, done) {
  console.log('serialized: ', user);
  done(null, user.id);
});

// Runs on every request after user is authenticated
// Look up the user's id in the session and use it to find them in the DB for each request
// result is stored on req.user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) {
      done(err);
    }

    console.log('-----------------------------------------------\ndeserialized: ', user.id);
    done(null, user);
  });
});

// Does actual work of logging in
// Called by middleware stack in routes/index.js post('/')
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
  }, function(req, username, password, done) {
    // mongoose stuff
    User.findOne({username: username}, function(err, user) {
      if(err) {
        throw err;
      }

      // user variable passed to us from Mongoose if it found a match to findOne() above
      if(!user) {
        // user not found
        console.log('user.strategy.js :: no user found');
        return done(null, false, {message: 'Incorrect credentials.'});
      } else {
        // found user! Now check their given password against the one stored in the DB
        // comparePassword() is defined in the schema/model file!
        user.comparePassword(password, function(err, isMatch) {
          if(err) {
            throw err;
          }

          if(isMatch) {
            // all good, populate user object on the session through serializeUser
            console.log('user.strategy.js :: all good');
            return (done(null, user)); // goes to serializeUser() above
          } else {
            // no good.
            console.log('user.strategy.js :: password incorrect');
            done(null, false, {message: 'Incorrect credentials.'}); // effectivey responds with a 403 status code
          }
        });
      } // end else
    }); // end findOne
  } // end callback
));

module.exports = passport;
