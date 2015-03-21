"use strict";

// Load required modules
var express       = require('express');
var debug         = require('debug')('coinbox');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var crypto        = require('crypto');
var bodyParser    = require('body-parser');
var models        = require('./models');
var passport      = require('passport');
var BearerStrategy= require('passport-http-bearer').Strategy;
var config        = require(__dirname + '/config/security.json');

// Create an Express app
var app = express();

// Specify basic route middleware
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize authentication library
app.use(passport.initialize());

// Handle CSRF token management for all routes
app.use ('/', function (req, res, next) {
  debug(req.path);
  if (req.method === 'POST' || req.method === 'PUT') {
    if(req.get('X-XSRF-TOKEN') == req.session.XSRFToken){
      debug('  XSRF Token match.')
      next();
    } else {
      debug('  XSRF Token mismatch.')
      res.send({success: false, error: "XSRF Token mismatch."})
    }
  } else if (req.method === 'GET' && (!req.cookies['XSRF-TOKEN']
      || req.get('X-XSRF-TOKEN') != req.session.XSRFToken)) {
    debug('Get request missing CSRF token. Generating and saving...');
    var csrf = crypto.randomBytes(20).toString('hex');
    res.cookie('XSRF-TOKEN', csrf);
    req.session.XSRFToken = csrf;
    next();
  } else {
    next();
  }
});

// Pre-fetch the currently logged-in user for API requests
app.use ('/api', function (req, res, next) {
  if(req.session.userID){
    models.User.find(req.session.userId).then(function(user) {
      req.user = user;
      user.getInfo().then(function(info){
        debug('  Found user');
        req.userinfo = info;
        next();
      });
    });
  } else {
    next();
  }
});

// Define the modules that will handle various API routes
app.use('/api/users', require('./api/user'));

// Set up OAuth Authentication Strategy
passport.use(new BearerStrategy(function (token, done) {
  models.User.find({ where: {token: token}}).then(function(user) {
    if (!user) return done(null, false);
    return done(null, user);
  });
}));

// Send all other routes to the single page front-end application
app.route('/*').get(function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Ensure the database model is sync'd with the db, then start the app
models.sequelize.sync().then(function () {
  var port   = process.env['PORT'] || 3000;
  var server = app.listen(port, function() {
    debug('Express server listening on port ' + server.address().port);
  });
});
