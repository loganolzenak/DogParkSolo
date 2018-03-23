var express = require('express');
var router = express.Router();
var passport = require('passport');

// Handles login form POST from index.html
router.post('/',
    passport.authenticate('local', {
        // request stays within node/express and is routed as a new request
        successRedirect: '/user',     // goes to routes/user.js
        failureRedirect: '/loginFailure'   // goes to get '/' route below
    })
);

module.exports = router;
