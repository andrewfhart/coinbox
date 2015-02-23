'use strict';

var React   = require('react');
var Router  = require('react-router');
var { Route, RouteHandler, Link } = Router;

var userActions = require('../../flux/actions/user');
var userStore   = require('../../flux/stores/user');

var Login = require('../Login.jsx');

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      if (!auth.loggedIn()) {
        Login.attemptedTransition = transition;
        transition.redirect('/login');
      }
    }
  },

  login: function (username, password, cb) {
    userActions.login(username, password);
  },

  logout: function (cb) {
    userActions.logout();
  },

  loggedIn: function () {
    return userStore.state.get('isAuth');
  }
};

module.exports = Authentication;
