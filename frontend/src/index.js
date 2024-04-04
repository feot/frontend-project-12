import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store.js';
import reportWebVitals from './reportWebVitals';
import {
  Provider as RollBarProvider,
  ErrorBoundary
} from '@rollbar/react';

import './i18next.js';

import './index.css';

const {
  REACT_APP_RUNTIME_ENV : nodeEnv,
  REACT_APP_ROLLBAR_CLIENT_TOKEN: rollbarAccessToken,
} =  process.env;
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
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
