import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./private-route";

import Home from "../pages/Home";

const routes = [
  {
    path: "/",
    component: Home
  }
];

export default () => (
  <Switch>
    {routes.map(({ path, exact, component, isPrivate }, index) => {
      if (!isPrivate) {
        return (
          <Route key={index} to={path} exact={exact} component={component} />
        );
      } else {
        return (
          <PrivateRoute
            key={index}
            to={path}
            exact={exact}
            component={component}
          />
        );
      }
    })}
  </Switch>
);
