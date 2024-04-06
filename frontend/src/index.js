import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  Provider as RollBarProvider,
  ErrorBoundary,
} from '@rollbar/react';
import App from './App';
import store from './store.js';

import './index.css';

const {
  REACT_APP_RUNTIME_ENV: nodeEnv,
  REACT_APP_ROLLBAR_CLIENT_TOKEN: rollbarAccessToken,
} = process.env;
const environment = (nodeEnv === 'production') ? 'production' : 'dev';

const rollbarConfig = {
  accessToken: rollbarAccessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RollBarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </RollBarProvider>
  </Provider>,
);
