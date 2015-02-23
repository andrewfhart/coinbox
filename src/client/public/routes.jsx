'use strict';

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

/* Components */
var App           = require('./components/App.jsx');
var Login         = require('./components/Login.jsx');
var Logout        = require('./components/Logout.jsx');
var Home          = require('./components/home/Home.jsx');

/* Routes */
var routes = (
  <Route handler={App}>
    <Route name="login"  handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="home"   handler={Home}/>
  </Route>
);

module.exports = routes;
