// Containers - divid states and actions
// Every dispatch through Redux saga
// saga divid API Call, action to reducer.

import React, { Component } from 'react';
import { connect } from 'react-redux';

// import view from screen directory
import { LoginScreen } from '../screen/login.screen';

// import type
import {
  USER_LOGIN_FACEBOOK,
  USER_LOGIN_TWITTER,
  USER_LOGIN_GOOGLE,
  USER_LOGIN_EMAIL,
  USER_LOGOUT
} from '../auth-type';

// set state from reducer
const mapStateToProps = state => ({
  user: state.auth.user,
  isPendingLogin: state.auth.isPendingLogin,
  isPendingLogout: state.auth.isPendingLogout,
  error: state.auth.error,
});

// set dispatch to saga
const mapDispatchToProps = dispatch => ({
  loginWithEmailByDispatch: (email, password) => {
    dispatch({
      type: USER_LOGIN_EMAIL.PENDING,
      email,
      password
    })
  },
  logoutByDispatch: () => {
    dispatch({
      type: USER_LOGOUT.PENDING,
    });
  },
});

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
