'use strict';

var ReactFlux     = require('react-flux');
var userConstants = require('../constants/user');
var request       = require('request');
var api           = require('../../api');

module.exports = ReactFlux.createActions({

  create: [userConstants.CREATE, function (username, password) {
    console.log("UserActions.create", username, password);
    return api.post('/users/create', {username: username, password: password});
  }],

  /**
  * Action may return a value(SUCCESS PAYLOAD), an error, or a promise
  */
  login: [userConstants.LOGIN, function (username, password){
    console.log("UserActions.login", username, password);
    return api.post('/users/authenticate', {username: username, password: password});
  }],

  /**
  * An action without a callback will always be successful
  */
  logout: [userConstants.LOGOUT, function () {
    console.log("UserActions.logout");
    return api.post('/users/logout');
  }]

});
