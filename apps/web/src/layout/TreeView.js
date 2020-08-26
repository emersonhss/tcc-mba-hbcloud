import React, { Component } from 'react'

export default class TreeView extends Component {

    constructor(props){
        super(props);
        this.state = {
            opened: props.opened
        };
        this.toogle = this.toogle.bind(this);
    }

    toogle(event) {
        this.setState({opened: !this.state.opened});
    }

    render() {
        const {title, children} = this.props;
        const {opened} = this.state;
        return (
            <li className={`treeview ${opened ? 'active menu-open' : ''}`}>
                <a role="button" onClick={this.toogle}>
                    <i className="fa fa-link"></i> <span>{title}</span>
                    <span className="pull-right-container">
                        <i className="fa fa-angle-left pull-right"></i>
                    </span>
                </a>
                <ul className="treeview-menu">
                    {children}
                </ul>
            </li>
        );
    }
}