'use strict';

var React   = require('react');
var Router  = require('react-router');
var { Route, RouteHandler, Link } = Router;

var Authentication = require('./common/Authentication.jsx');


var Logout = React.createClass({
  mixins: [ Router.Navigation ],

  render: function () {
    return (
      <div>
        You have been logged out.
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = Logout;
