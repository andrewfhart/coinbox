'use strict';

var React  = require('react');
var Flux   = require('react-flux');
var Router = require('react-router');
var {Route, RouteHandler, Link } = Router;

var Login    = require('../Login.jsx');
var Register = require('../Register.jsx');

var userStore = require('../../flux/stores/user');


var Splash = React.createClass({

    mixins: [
    userStore.mixin()
  ],

  getStateFromStores: function(){
    console.log("App.getStateFromStores");
    return {
      user: userStore.state
    };
  },

  render: function () {
    return (
      <div>
        <Login/>
        <Register/>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = Splash;
