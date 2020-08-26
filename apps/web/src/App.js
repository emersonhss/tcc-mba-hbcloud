import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Login from './modules/login/Login';
import System from './modules/system/System';
import TransictionPage from './components/TransictionPage';
import './App.css';
import { withKeycloak } from 'react-keycloak';

const loginBodyClassNames = 'hold-transition login-page';
const systemBodyClassNames = 'skin-blue fixed';

@inject("userStore")
@inject("routerStore")
@observer
class App extends Component {

  render() {
    const { keycloak } = this.props;
      console.log("Keycloak:", keycloak);
      const Component = keycloak.authenticated ? System : Login;
      return (
        <div id="content-routes">
          <Route path="/" component={Component} />
        </div>
      );
  }
}

export default withKeycloak(App);