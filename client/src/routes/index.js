import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

const Home = Loadable({
  loader: () => import('../pages/Home'),
  loading: Loading,
});
const SignUp = Loadable({
  loader: () => import('../pages/SignUp'),
  loading: Loading,
});
const SignIn = Loadable({
  loader: () => import('../pages/SignIn'),
  loading: Loading,
});
const ProductDetail = Loadable({
  loader: () => import('../pages/ProductDetail'),
  loading: Loading,
});
const User = Loadable({
  loader: () => import('../pages/User'),
  loading: Loading,
});

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/sign-up',
    component: SignUp,
  },
  {
    path: '/sign-in',
    component: SignIn,
  },
  {
    path: '/product-detail/:id',
    component: ProductDetail,
  },
  {
    path: '/user/:tab',
    component: User,
    isPrivate: true,
  },
  {
    path: '*',
    component: () => (
      <div
        style={{
          flexGrow: 1,
          width: '100vw',
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        404 not found !
      </div>
    ),
  },
];

export default () => (
  <Switch>
    {routes.map(({ path, exact = true, component, isPrivate }, index) => {
      if (!isPrivate) {
        return (
          <Route key={index} path={path} exact={exact} component={component} />
        );
      } else {
        return (
          <PrivateRoute
            key={index}
            path={path}
            exact={exact}
            component={component}
          />
        );
      }
    })}
  </Switch>
);
