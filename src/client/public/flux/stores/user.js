'use strict';

var ReactFlux     = require('react-flux');
var Router        = require('../../router');
var userConstants = require('../constants/user');

var Store = ReactFlux.createStore({

  getInitialState: function(){
    console.log("UserStore.getInitialState");
    return {
      data: null,
      isAuth: false,
      error: null
    }
  },

  storeDidMount: function(){
    console.log("UserStore.storeDidMount");
  },

  getUsername: function(){
    return this.state.get('isAuth') ? this.state.get('data').username : null;
  }

}, [

  [userConstants.CREATE, function onCreate(payload){
    console.log("UserStore.onCreate", JSON.stringify(payload));
    this.setState({
      isCreating: true
    });

  }],

  [userConstants.CREATE_SUCCESS, function handleCreateSuccess(payload){
    console.log("UserStore.handleCreate", JSON.stringify(payload));
    this.setState({
      isCreating: false,
      create_error: null,
      data: payload,
      isAuth: true
    });
  }],

  [userConstants.CREATE_FAIL, function handleCreateFailure(error){
    console.log("UserStore.handleCreateFailure", error.message);
    this.setState({
      isCreating: false,
      create_error: error.message
    });
  }],

  /**
  * Dispatcher calls this directly when it receives a USER_LOGIN message,
  * just before it tries to execute the corresponding action
  */
  [userConstants.LOGIN, function onLogin(payload){
    console.log("UserStore.onLogin", JSON.stringify(payload));
    this.setState({
      isLoggingIn: true
    });
  }],

  /**
  * This gets called if USER_LOGIN action was successful
  */
  [userConstants.LOGIN_SUCCESS, function handleLoginSuccess(payload){
    console.log("UserStore.handleLogin", JSON.stringify(payload));
    this.setState({
      isLoggingIn: false,
      login_error: null,
      data: payload,
      isAuth: true,
      token: payload.token
    });
    Router.transitionTo('/home');
  }],

  /**
  * This gets called if USER_LOGIN action was unsuccessful
  */
  [userConstants.LOGIN_FAIL, function handleLoginFailure(error){
    console.log("UserStore.handleLoginFailure", error.message);
    this.setState({
      isLoggingIn: false,
      login_error: error.message,
      token: null
    });
  }]

]);

Store.addActionHandler(userConstants.LOGOUT, {
  success: function(){
    console.log("UserStore.handleLogout");
    this.parent.setState({
      isAuth: false,
      token: null,
      data: null
    });
    Router.transitionTo('/');
  }
});

module.exports = Store;
