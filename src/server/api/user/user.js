var models  = require('../../models');
var debug = require('debug')('ballistic');
var validator = require('validator');

function buildReplyUser(user, userInfo) {
  var replyUser = {};
  replyUser = user.values;
  replyUser.meta = userInfo.values;
  delete replyUser.password;
  return replyUser;
}

exports.create = function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.send({success: false, error: 'fields left empty'});
  } else if (req.body.password.length < 8) {
    res.send({success: false, error: 'password too short'});
  } else if (req.body.username.length < 2) {
    res.send({success: false, error: 'username too short'});
  } else if (!validator.isAlphanumeric(req.body.username)) {
    res.send({success: false, error: 'username must contain only letters and numbers'});
  } else {
    models.User.find({ where: {username: req.body.username.toLowerCase()}}).then(function(user) {
      if (user) {
        res.send({success: false, error: 'username already taken'});
      } else {
        models.User.hash(req.body.password, function(err, hash){
          models.User.create({ username: req.body.username.toLowerCase(), password: hash }).then(function(user) {
            models.UserInfo.create({}).then(function(userInfo){
              userInfo.setUser(user);
              req.session.userId = user.id;
              res.send({success: true, user: buildReplyUser(user, userInfo)});
            });
          });
        });
      }
    });
  }
}

exports.authenticate = function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.send({success: false, error: 'fields left empty'});
  } else {
    models.User.find({ where: {username: req.body.username.toLowerCase()}}).then(function(user) {
      if (!user) {
        res.send({success: false, error: 'user not found'});
      } else {
        models.User.checkPassword(req.body.password, user.password, function(err, match) {
          if (!match) {
            res.send({success: false, error: 'password incorrect'});
          } else {
            user.getUserInfo().then(function(userInfo){
              req.session.userId = user.id;
              res.send({success: true, user: buildReplyUser(user, userInfo)});
            });
          }
        });
      }
    });
  }
}

exports.session = function(req, res) {
  if (req.user) {
    models.User.find(req.session.userId).then(function(user){
      user.getUserInfo().then(function(userInfo){
        res.send({success: true, user: buildReplyUser(user, userInfo)});
      });
    });
  } else {
    debug('session expired');
    res.send({success: false, error: 'session expired'});
  }
}

exports.logout = function(req, res) {
  if (req.user) {
    req.session.userId = null;
    res.send({success: true});
  } else {
    res.send({success: false, error: 'session expired'});
  }
}
