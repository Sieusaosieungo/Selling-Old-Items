import React from 'react';
import { withCookies } from 'react-cookie';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ cookies, component: Component, ...rest }) => {
  const { accessToken, isAuth } = cookies.cookies;

  return (
    <Route
      {...rest}
      render={props => {
        if (accessToken && accessToken !== '' && isAuth === 'true') {
          return <Component {...props} />;
        } else {
          return <Redirect to="/sign-in" />;
        }
      }}
    />
  );
};

export default withCookies(PrivateRoute);
