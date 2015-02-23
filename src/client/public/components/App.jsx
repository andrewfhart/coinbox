'use strict';

var React   = require('react');
var Router  = require('react-router');
var { Route, RouteHandler, Link } = Router;

var userStore = require('../flux/stores/user');

var App = React.createClass({

  mixins: [
    userStore.mixin()
  ],

  getStateFromStores: function(){
    console.log("App.getStateFromStores");
    return {
      user: userStore.state
    };
  },

  render: function(){
    return (
      <div>
        <h1>Coinbox</h1>
        <RouteHandler/>
      </div>
    );
  }
});


module.exports = App;
