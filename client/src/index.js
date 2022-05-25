import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import {Auth0Provider} from '@auth0/auth0-react'


ReactDOM.render(
  <Provider store={store}>
  <Auth0Provider
  domain='dev-08nbd6-j.us.auth0.com'
  clientId='86ExQ5ims6TxCjFw1x1N2MnoMSLZ3zYV'
  redirectUri={window.location.origin}
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
