import React, { Component } from 'react';
import Icon from './Icon';
import './FabButton.css';

export default class FabButton extends Component {

    render() {
        const {iconName, onClickAction, alt} = this.props;
        return (
            <a role="button"  className="btn-fab" alt={alt} onClick={(e)=> {onClickAction && onClickAction(e)}}>
                <Icon type="fa" name={iconName} />
            </a>
        );
    }
}

