import './dependencies';
import 'es6-symbol/implement';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore  } from 'mobx-react-router';
import './index.css';
import App from './App';
import Stores from './stores/RootStores';
import registerServiceWorker from './registerServiceWorker';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';

// Setup Keycloak instance as needed
const keycloak = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'hbcloudrealm',
    clientId: 'hbcloud'
});

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, Stores.routerStore);

ReactDOM.render(
    <Provider {...Stores}>
        <KeycloakProvider keycloak={keycloak}>
            <Router history={history}>
                <App />
            </Router>
        </KeycloakProvider>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
