// Containers - divid states and actions
// Every dispatch through Redux saga
// saga divid API Call, action to reducer.

import React, { Component } from 'react';
import { connect } from 'react-redux';

// import view from screen directory
import { SignUpScreen } from '../screen/sign-up.screen';

// import type
import { USER_SIGNUP_GOOGLE, USER_SIGNUP_EMAIL } from '../auth-type';

// set state from reducer
const mapStateToProps = state => ({
  uid: state.auth.uid,
  user: state.auth.user,
  isPendingSignUp: state.auth.isPendingSignUp,
  error: state.auth.error,
});

// set dispatch to saga
const mapDispatchToProps = (dispatch, getState) => ({
  signUpWithGoogleByDispatch: () => {
    dispatch({
      type: USER_SIGNUP_GOOGLE.PENDING
    });
  },
  signUpWithEmailByDispatch: (email, password, navigation) => {
    dispatch({
      type: USER_SIGNUP_EMAIL.PENDING,
      email,
      password,
      navigation
    });
  },
});

export const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
