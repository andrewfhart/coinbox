var React  = require('react');
var Flux   = require('react-flux');
var Router = require('react-router');
var Bootstrap = require('react-bootstrap');

var {Route, RouteHandler, Link } = Router;
var {Navbar, Nav, NavItem, DropdownButton, MenuItem} = Bootstrap;

var Authentication = require('./Authentication.jsx');

var Navigation = React.createClass({

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

  doLogout: function (event) {
    event.preventDefault();
    Authentication.logout();
  },

  render: function () {
    return (
      <div>
        <Navbar>
          <Nav>
            <NavItem eventKey={1} href="/home" onClick={this.navigateHome}>Home</NavItem>
            <NavItem eventKey={2} href="/accounts" onClick={this.navigateAccounts}>Accounts</NavItem>
            <DropdownButton eventKey={3} title="Dropdown">
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3">Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4" onClick={this.doLogout}>Log out</MenuItem>
            </DropdownButton>
          </Nav>
        </Navbar>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = Navigation;
