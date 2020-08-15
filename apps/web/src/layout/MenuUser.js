import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import Moment from 'react-moment';
import moment from 'moment';
import { withKeycloak } from 'react-keycloak';

import Icon from './Icon';

@inject("userStore")
@observer
class MenuUser extends Component {

    sair = (e) => {
        const { keycloak, history } = this.props;
        keycloak.logout();
        history.replace("/login");
    };

    _renderEntrar(){
        return (
            <a role="button">
                <Icon type="far" name="sign-in-alt" />
                <span className="hidden-xs">Entrar</span>
            </a>
        );
    }

    _renderUser(user, toggle, show) {
        const { keycloak } = this.props;
        return (
            <Fragment>
                {/* <!-- User Account Menu --> */}
                {/* <!-- Menu Toggle Button --> */}
                <a data-target="#menu-usuario" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded={show} onClick={toggle}>
                    {/* <!-- The user image in the navbar--> */}
                    <Icon type="fa" name="user" />
                    {/* <!-- hidden-xs hides the username on small devices so only the image appears. --> */}
                    <span className="hidden-xs">{user.name}</span>
                </a>
                <ul id="menu-usuario" className="dropdown-menu">
                    {/* <!-- The user image in the menu --> */}
                    <li className="user-header">
                        <Icon type="fa" name="user" />

                        <p>
                        {user.name} - Web Developer
                        <small>Último acesso em {moment(new Date(user.auth_time * 1000)).format('DD/MM/YYYY HH:mm')}</small>
                        </p>
                    </li>
                    {/* <!-- Menu Body --> */}
                    <li className="user-body">
                        <div className="row">
                        <div className="col-xs-4 text-center">
                            <a role="button">Followers</a>
                        </div>
                        <div className="col-xs-4 text-center">
                            <a role="button">Sales</a>
                        </div>
                        <div className="col-xs-4 text-center">
                            <a role="button">Friends</a>
                        </div>
                        </div>
                        {/* <!-- /.row --> */}
                    </li>
                    {/* <!-- Menu Footer--> */}
                    <li className="user-footer">
                        <div className="pull-left">
                        <a role="button" className="btn btn-default btn-flat">Profile</a>
                        </div>
                        <div className="pull-right">
                        <a role="button" className="btn btn-danger btn-flat" onClick={this.sair}>Sair</a>
                        </div>
                    </li>
                </ul>
            </Fragment>
        )

    }

    render() {
        const { show, toggle, keycloak } = this.props;
        return (
            <li className={`dropdown user user-menu ${show ? 'open' : ''}`}>
                {keycloak.authenticated ? this._renderUser(keycloak.idTokenParsed, toggle, show) : this._renderEntrar()}
            </li>
        );
    }

}

export default withKeycloak(MenuUser);