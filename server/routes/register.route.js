var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.model');

// Handles POST request with new user data
router.post('/', function(req, res, next) {
  /*
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  recipes: {type: Array}
  */
  var userToSave = {
    username : req.body.username,
    password : req.body.password
  };

  // save to database, triggers user model pre-save hook
  User.create(userToSave, function(err, post) {
        if(err) {
          console.log('error saving to db: ', err);           
          res.sendStatus(500);
        } else {
          console.log('created new user in db: ', post);          
          res.sendStatus(201);
        }
  });
  
});


module.exports = router;
