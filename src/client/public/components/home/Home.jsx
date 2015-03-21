var React  = require('react');
var Flux   = require('react-flux');
var Router = require('react-router');
var Bootstrap = require('react-bootstrap');

var {Route, RouteHandler, Link } = Router;
var {Navbar, Nav, NavItem, DropdownButton, MenuItem} = Bootstrap;

var Navigation = require('../common/Navigation.jsx');

var Home = React.createClass({

  mixins: [
    Router.Navigation
  ],

  navigateHome: function (event) {
    event.preventDefault();
    this.transitionTo('/home');
  },

  navigateAccounts: function (event) {
    event.preventDefault();
    this.transitionTo('/accounts');
  },

  render: function () {
    return (
      <div>
        <Navigation/>
        This is the home page
      </div>
    );
  }
});

module.exports = Home;
