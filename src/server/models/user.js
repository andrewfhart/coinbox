"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasOne(models.UserInfo);
      },
      hash: function(password, callback) {
        bcrypt.genSalt(11, function (err, salt) {
          if (err){
            callback(err, null);
          } else {
            bcrypt.hash(password, salt, function(err, hash) {
              if (err){
                callback(err, null);
              } else {
                callback(null, hash.toString('hex'));
              }
            });
          }
        });
      },
      checkPassword: function(password, hash, callback) {
        bcrypt.compare(password, hash, function (err, matched) {
          callback(err, matched);
        });
      }
    },
    instanceMethods: {
      regenerateToken: function (callback) {
        var that = this;
        User.hash(this.getDataValue('username') + this.getDataValue('password') + new Date(), function (err, token) {
          console.log('token: ' + token);
          if (err) return callback(err);
          that.updateAttributes({token: token}).then(function () {
            callback(null, token);
          });
        });
      }
    }
  });

  return User;
};
