'use strict';

var React  = require('react');
var Router = require('./router');
var Route  = Router.Route;

document.addEventListener("DOMContentLoaded", function(event) {
  Router.run(function (Handler, state) {
    React.render(<Handler />, document.getElementById('__app'));
  });
});
