var React = require('react');
var Flux  = require('react-flux');

var userStore   = require('./flux/stores/user');
var userActions = require('./flux/actions/user');

var App = React.createClass({

  mixins: [
    userStore.mixin()
  ],

  getStateFromStores: function(){
    console.log("App.getStateFromStores");
    return {
      user: userStore.state
    };
  },

  login: function(){
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    userActions.login(username, password);
    return false;
  },

  logout: function(){
    userActions.logout();
    return false;
  },

  render: function(){
    if( !this.state.user.get('isAuth') ){
      return this.renderLogin();
    }
    return this.renderHome();
  },

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

window.onload = function(){
  React.render(<App />, document.getElementById('__app'));
};
