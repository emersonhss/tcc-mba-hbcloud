import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MenuUser from './MenuUser';
import MenuMessages from './MenuMessages';
import MenuNotification from './MenuNotification';
import MenuTasks from './MenuTasks';
import Icon from './Icon';
import '../styles';

export default class MainHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            menuShow: ''
        }
    }

    _toggle(menu) {
        if(this.state.menuShow === menu) {
            this.setState({ menuShow: '' });
        } else {
            this.setState({ menuShow: menu });
        }
    }

    _showMenu(menu) {
        return this.state.menuShow === menu;
    }

    render() {
        const { history } = this.props;
        return (
            <header className="main-header">

                {/* <!-- Logo --> */}
                <Link to="/" className="logo">
                    {/* <!-- mini logo for sidebar mini 50x50 pixels --> */}
                    <span className="logo-mini"><b>Hb</b>.cld</span>
                    {/* <!-- logo for regular state and mobile devices --> */}
                    <span className="logo-lg"><b>Handball</b>.cloud</span>
                </Link>

                {/* <!-- Header Navbar --> */}
                <nav className="navbar navbar-static-top">
                    {/* <!-- Sidebar toggle button--> */}
                    <a className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <Icon type="fa" name="bars" />
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    {/* <!-- Navbar Right Menu --> */}
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                        
                        <MenuMessages show={this._showMenu('messages')} toggle={() => this._toggle('messages')} />
                        
                        <MenuNotification show={this._showMenu('notifications')} toggle={() => this._toggle('notifications')} />
                        
                        <MenuTasks show={this._showMenu('tasks')} toggle={() => this._toggle('tasks')} />
                        
                        <MenuUser show={this._showMenu('user')} toggle={() => this._toggle('user')} history={history} />
                        {/* <!-- Control Sidebar Toggle Button --> */}
                        <li>
                            <a role="button" data-toggle="control-sidebar"><Icon type="fa" name="cogs" /></a>
                        </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }

}