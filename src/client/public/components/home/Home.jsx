var React  = require('react');
var Flux   = require('react-flux');
var Router = require('react-router');
var {Route, RouteHandler, Link } = Router;


var Home = React.createClass({
  render: function () {
    return (
      <div>
        <h3>Welcome home!</h3>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = Home;
