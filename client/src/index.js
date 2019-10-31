import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import router from "./routes";
import { PlatformProvider } from "./context/platform";

const store = createStore(rootReducer);

const render = () => {
  const userAgent = navigator.userAgent;

  const app = (
    <BrowserRouter>
      <Provider store={store}>
        <PlatformProvider userAgent={userAgent}>
          <App>{router()}</App>
        </PlatformProvider>
      </Provider>
    </BrowserRouter>
  );

  ReactDOM.render(app, document.getElementById("root"));
};

render();

serviceWorker.unregister();
