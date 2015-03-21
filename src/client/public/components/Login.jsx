'use strict';

var React   = require('react');
var Router  = require('react-router');
var { Route, RouteHandler, Link } = Router;

var Authentication = require('./common/Authentication.jsx');
var userStore      = require('../flux/stores/user');


var Login = React.createClass({
  mixins: [
    Router.Navigation,
    userStore.mixin()
  ],

  statics: {
    attemptedTransition: null
  },

  getStateFromStores: function(){
    console.log("App.getStateFromStores");
    return {
      user: userStore.state
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    Authentication.login(username, password, function (loggedIn) {
      if (!loggedIn)
        return this.setState({ error: true });

      if (Login.attemptedTransition) {
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        this.replaceWith('/home');
      }
    }.bind(this));
  },

  render: function () {
    var errors = this.state.user.get('login_error') ? <p>Bad Login Information: {this.state.user.get('login_error')}!</p> : '';
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="username" placeholder="username"/></label>
          <label><input type="password" ref="password" placeholder="password"/></label>
          <button type="submit">login</button>
          {errors}
        </form>
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = Login;
