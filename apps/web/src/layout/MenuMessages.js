import React, { Component } from 'react';
import Icon from './Icon';

export default class MenuMessages extends Component {

    render() {
        const { show, toggle } = this.props;
        return (
            <li className={`dropdown messages-menu ${show ? 'open' : ''}`}>
                {/* <!-- Messages: style can be found in dropdown.less--> */}
                {/* <!-- Menu toggle button --> */}
                <a role="button" className="dropdown-toggle" data-toggle="dropdown" aria-expanded={show} onClick={toggle}>
                <Icon type="far" name="envelope" />
                <span className="label label-success">4</span>
                </a>
                <ul className="dropdown-menu">
                <li className="header">Você tem 4 mensagens.</li>
                <li>
                    {/* <!-- inner menu: contains the messages --> */}
                    <ul className="menu">
                    <li>
                        {/* <!-- start message --> */}
                        <a role="button">
                        <div className="pull-left">
                            {/* <!-- User Image --> */}
                            <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User" />
                        </div>
                        {/* <!-- Message title and timestamp --> */}
                        <h4>
                            Time de Suporte
                            <small><Icon type="fa" name="clock" /> 5 minutos</small>
                            </h4>
                        {/* <!-- The message --> */}
                        <p>Mensagem qualquer?</p>
                        </a>
                    </li>
                    {/* <!-- end message --> */}
                    </ul>
                    {/* <!-- /.menu --> */}
                </li>
                <li className="footer"><a role="button">See All Messages</a></li>
                </ul>
                {/* <!-- /.messages-menu --> */}
            </li>
        );
    }
}