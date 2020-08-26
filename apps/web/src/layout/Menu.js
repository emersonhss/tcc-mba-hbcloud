import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TreeView from './TreeView';
import TreeViewMenu from './TreeViewMenu';

@inject("routerStore")
@observer
export default class Menu extends Component {

    _renderSubMenuTree(menu, pathname) {
        if(menu.submenus && menu.submenus.length){
            return menu.submenus.map(submenu => 
                <TreeViewMenu key={submenu.alias} link={submenu.link} title={submenu.title} 
                    opened={this._isOpenMenuTreeView(pathname, submenu.link)} />);
        }
        return null;
    }

    _renderMenuTree(menuObject, pathname) {
        if(menuObject) {
            return menuObject.map(menu => (
                <TreeView key={menu.alias} title={menu.title} link={menu.link} opened={this._isOpenMenuTree(pathname, menu.alias)}>
                    {this._renderSubMenuTree(menu, pathname)}
                </TreeView>
            ));
        }
        return null;
    }

    _isOpenMenuTree = (path, alias) => path.indexOf(`/${alias}`) > -1;

    _isOpenMenuTreeView = (path, link) => path === link;

    render(){
        const title = this.props.title ? this.props.title : 'MENU';
        const menuObject = this.props.menuObject;
        const className = this.props.className ? this.props.className : 'sidebar-menu';
        const { routerStore } = this.props;
        return (
            <ul className={className} data-widget="tree">
                {/* <!-- Sidebar Menu --> */}
                <li className="header">{title}</li>
                {/* <!-- Optionally, you can add icons to the links --> */}
                {this._renderMenuTree(menuObject, routerStore.location.pathname)}
                {/* <!-- /.sidebar-menu --> */}
            </ul>
        );
    }
}