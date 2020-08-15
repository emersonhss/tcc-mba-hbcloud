import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TreeViewMenu extends Component {


    render(){
        const {link, title, opened} = this.props;
        return (
            <li className={opened ? 'active' : ''}><Link to={link} replace={true}>{title}</Link></li>
        );
    }

}