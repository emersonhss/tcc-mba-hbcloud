import React, { Component } from 'react'
import Icon from './Icon';

export default class MenuNotification extends Component {

    render() {
        const { show, toggle } = this.props;
        return (
        <li className={`dropdown notifications-menu ${show ? 'open' : ''}`}>
                {/* <!-- Notifications Menu --> */}
                {/* <!-- Menu toggle button --> */}
                <a role="button" className="dropdown-toggle" data-toggle="dropdown" aria-expanded={show} onClick={toggle}>
                <Icon type="far" name="bell" />
                <span className="label label-warning">10</span>
                </a>
                <ul className="dropdown-menu">
                <li className="header">Você tem 10 notificações</li>
                <li>
                    {/* <!-- Inner Menu: contains the notifications --> */}
                    <ul className="menu">
                    <li>
                        {/* <!-- start notification --> */}
                        <a role="button">
                        <Icon type="fa" name="users" className="text-aqua" /> 5 novos membros se juntaram hoje
                        </a>
                    </li>
                    {/* <!-- end notification --> */}
                    </ul>
                </li>
                <li className="footer"><a role="button">Ver todos</a></li>
                </ul>
            </li>
        );
    }

}