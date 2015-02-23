'use strict';

var React   = require('react');
var Router  = require('react-router');
var { Route, RouteHandler, Link } = Router;

var App = React.createClass({

  /*
  mixins: [
    userStore.mixin()
  ],

  getStateFromStores: function(){
    console.log("App.getStateFromStores");
    return {
      user: userStore.state
    };
  },
  */

  render: function(){
    return (
      <div>
        <ol>
          <li><Link to="home">Home</Link></li>
          <li><Link to="login">Log In</Link></li>
        </ol>
        <RouteHandler/>
      </div>
    );
    /*
    if( !this.state.user.get('isAuth') ){
      return this.renderLogin();
    }
    return this.renderHome();
    */
  }
});

  /*
  renderHome: function(){
    return (
      <div>
      <h3>Hello {this.state.user.get('data').username}!</h3>
      <a href="#" onClick={this.logout}>Logout</a>
      </div>
    );
  },

  renderLogin: function(){
    if( this.state.user.get('isLoggingIn') ){
      return(<div>Logging in...</div>);
    }
    return(
      <div>
        <h3>LOGIN</h3>
        Username: <input type="text" ref="username" /> <i>Leave empty to cause an error</i>
        <br />
        Password: <input type="password" ref="password" /> <i>Leave empty to cause an error</i>
        <br />
        <button onClick={this.login}>Click to login</button>
        {this.renderLoginError()}
      </div>
    );
  },

  renderLoginError: function(){
    if( !this.state.user.get('error') ){
      return;
    }
    return (<div style={{color: 'brown'}}>{this.state.user.get('error')}</div>)
  }

});
*/

module.exports = App;
