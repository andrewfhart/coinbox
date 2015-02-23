'use strict';

var React   = require('react');
var Router  = require('react-router');
var { Route, RouteHandler, Link } = Router;

var Authentication = require('./common/Authentication.jsx');


var Login = React.createClass({
  mixins: [ Router.Navigation ],

  statics: {
    attemptedTransition: null
  },

  getInitialState: function () {
    return {
      error: false
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
        this.replaceWith('/about');
      }
    }.bind(this));
  },

  render: function () {
    var errors = this.state.error ? 'Bad Login Information!' : '';
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="username" placeholder="username"/></label>
          <label><input ref="password" placeholder="password"/></label>
          <button type="submit">login</button>
          {errors}
        </form>
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = Login;
