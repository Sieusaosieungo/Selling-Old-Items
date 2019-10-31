import React, { createContext, useContext } from "react";
import usePlatformDetect from "../utils/usePlatformDetect";

const Context = createContext();

const PlatformProvider = ({ userAgent, children }) => {
  let { platform } = usePlatformDetect(userAgent);

  return <Context.Provider value={{ platform }}>{children}</Context.Provider>;
};

const withPlatform = Component => {
  return props => {
    const state = useContext(Context);

    return <Component {...props} {...state} />;
  };
};

export { PlatformProvider, withPlatform };
