'use strict';

var React   = require('react');
var Router  = require('react-router');
var { Route, RouteHandler, Link } = Router;

var Authentication = require('./common/Authentication.jsx');
var userStore      = require('../flux/stores/user');

var Register = React.createClass({

  mixins: [
    userStore.mixin()
  ],

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
    Authentication.create(username, password);
  },

  render: function () {
    var errors = this.state.user.get('create_error') ? <p>Bad registration info: {this.state.user.get('create_error')}</p> : '';
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="username" placeholder="username"/></label>
          <label><input ref="password" placeholder="password"/></label>
          <button type="submit">Register</button>
          {errors}
        </form>
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = Register;
