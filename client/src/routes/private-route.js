import React from 'react';
import { withCookies } from 'react-cookie';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  cookies,
  accessTokenStore,
  component: Component,
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
          return <Redirect to="/sign-in" />;
        }
      }}
    />
  );
};

const mapStateToProps = ({ auth }) => {
  return { accessTokenStore: auth.accessToken };
};

export default connect()(withCookies(PrivateRoute));
