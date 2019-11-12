import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PlatformProvider } from './context/platform';
import { CookiesProvider } from 'react-cookie';
import App from './components/App';
import rootReducer from './reducers';
import router from './routes';

const store = createStore(rootReducer);

const render = () => {
  const userAgent = navigator.userAgent;

  const app = (
    <BrowserRouter>
      <Provider store={store}>
        <CookiesProvider>
          <PlatformProvider userAgent={userAgent}>
            <App>{router()}</App>
          </PlatformProvider>
        </CookiesProvider>
      </Provider>
    </BrowserRouter>
  );

  ReactDOM.render(app, document.getElementById('root'));
};

render();

serviceWorker.unregister();
