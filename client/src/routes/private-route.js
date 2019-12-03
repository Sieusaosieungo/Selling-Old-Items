import React from 'react';
import { withCookies } from 'react-cookie';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateState } from '../actions';

const PrivateRoute = ({
  cookies,
  accessTokenStore,
  component: Component,
  dispatch,
  ...rest
}) => {
  const accessToken = accessTokenStore || cookies.cookies.accessToken;

  return (
    <Route
      {...rest}
      render={props => {
        if (accessToken && accessToken !== '') {
          return <Component {...props} />;
        } else {
          dispatch(updateState({ isShowModalSignIn: true }));
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default connect()(withCookies(PrivateRoute));
