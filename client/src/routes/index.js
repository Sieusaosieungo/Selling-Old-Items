import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./private-route";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/sign-up",
    component: SignUp
  },
  {
    path: "*",
    component: () => (
      <div
        style={{
          flexGrow: 1,
          width: "100vw",
          textAlign: "center",
          marginTop: "2rem"
        }}
      >
        404 not found !
      </div>
    )
  }
];

export default () => (
  <Switch>
    {routes.map(({ path, exact = true, component, isPrivate }, index) => {
      if (!isPrivate) {
        console.log(index);

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
