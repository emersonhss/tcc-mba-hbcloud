import React, { Component } from 'react';
import Icon from './Icon';

export default class MenuTasks extends Component {

    render() {
        const { show, toggle } = this.props;
        return (
            <li className={`dropdown tasks-menu ${show ? 'open' : ''}`}>
                {/* <!-- Tasks Menu --> */}
                {/* <!-- Menu Toggle Button --> */}
                <a role="button" className="dropdown-toggle" data-toggle="dropdown" aria-expanded={show} onClick={toggle}>
                <Icon type="far" name="flag" />
                <span className="label label-danger">9</span>
                </a>
                <ul className="dropdown-menu">
                <li className="header">Você tem 9 tarefas</li>
                <li>
                    {/* <!-- Inner menu: contains the tasks --> */}
                    <ul className="menu">
                    <li>
                        {/* <!-- Task item --> */}
                        <a role="button">
                        {/* <!-- Task title and progress text --> */}
                        <h3>
                            Executar algumas partidas
                            <small className="pull-right">20%</small>
                            </h3>
                        {/* <!-- The progress bar --> */}
                        <div className="progress xs">
                            {/* <!-- Change the css width attribute to simulate progress --> */}
                            <div className="progress-bar progress-bar-aqua" style={{width: '20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span className="sr-only">20% Completo</span>
                            </div>
                        </div>
                        </a>
                    </li>
                    {/* <!-- end task item --> */}
                    </ul>
                </li>
                <li className="footer">
                    <a role="button">View all tasks</a>
                </li>
                </ul>
            </li>
        );
    }
}