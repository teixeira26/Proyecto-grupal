import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import {Auth0Provider} from '@auth0/auth0-react';

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