import React, { Component } from 'react';
import Icon from '../layout/Icon';

const NavTabHeader = ({ active, tabName, children }) => (
    <li className={`${active ? 'active' : ''}`}><a href={`#${tabName}`} data-toggle="tab">{children}</a></li>
);

const NavTabBody = ({ active, tabName, children }) => (
    <div className={`tab-pane ${active ? 'active' : ''}`} id={tabName}>
        {children}
    </div>
);

export const NavTabItem = ({ active, tabName, label, children }) => {
    if (children && tabName) {
        return [
            <NavTabHeader key={`header-${tabName}`} active={active} tabName={tabName}>{label}</NavTabHeader>,
            <NavTabBody key={`body-${tabName}`} active={active} tabName={tabName}>{children}</NavTabBody>
        ];
    } else {
        throw new Error('Esse componente necessita de um children e tabName');
    }
};

export default class NavTabs extends Component {

    _renderNavTabHeader({ active, tabName, label}) {
        return <NavTabHeader key={`header-${tabName}`} active={active} tabName={tabName}>{label}</NavTabHeader>;
    }

    _renderNavTabBody({ active, tabName, children}) {
        return <NavTabBody key={`body-${tabName}`} active={active} tabName={tabName}>{children}</NavTabBody>;
    }

    render() {
        const { children, onSettings } = this.props;
        return (
            <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                    {children.map(child => this._renderNavTabHeader({ ...child.props }))}
                    {onSettings ? 
                    <li className="pull-right">
                        <a href="javascript:;" className="text-muted" onClick={onSettings} title="Configurações da Partida" alt="Configurações da Partida"><Icon type="fa" name="cogs" /></a>
                    </li> : null}
                </ul>
                <div className="tab-content">
                    {children.map(child => this._renderNavTabBody({ ...child.props }))}
                </div>
          </div>
        );
    }

}