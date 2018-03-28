var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

// kick off the mongoose database connection
require('./modules/database');

// passport strategy includes
var passport = require('./strategies/user.strategy');

// Route includes
var authenticate = require('./routes/authenticate.route');
var user = require('./routes/user.route');
var register = require('./routes/register.route');
var parks = require('./routes/park.route');


// create the app
var app = express();
var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json()); // parses angular data
app.use(bodyParser.urlencoded({extended: true})); // parses jQuery data

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration //
app.use(session({
   secret: 'secret', // this is a property that is used to uniquely differentiate our app. 'secret' isn't very good. Something like ag;uatw3982398afiuoihr8yr289r28ra would be better
   key: 'user', // this is the name of the req.variable. 'user' is convention, but not required
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 600000, secure: false } // this session expires after 600 seconds (10 minutes) without an interaction
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/** Routes **/
app.use('/register', register);
app.use('/user', user);
app.use('/park', parks);


// handles redirect from passport login failure
app.use('/loginFailure', function(req, res) {
    res.sendStatus(403);
});

// handles login/registration post request
app.use('/authenticate', authenticate);

/** Listen **/
app.listen(port, function(){
   console.log("Listening on port:", port);
});
