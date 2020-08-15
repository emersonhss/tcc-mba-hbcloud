import React, { Component } from 'react';
import './Alert.css';

const ACCEPT_TYPES = ['success', 'danger', 'warning', 'info'];
const ICONS = ['check', 'ban', 'warning', 'info'];

export default class Alert extends Component {

    _getIcon(type) {
        switch(type) {
            case ACCEPT_TYPES[0]:
                return ICONS[0];
            case ACCEPT_TYPES[1]:
                return ICONS[1];
            case ACCEPT_TYPES[2]:
                return ICONS[2];
            case ACCEPT_TYPES[3]:
                return ICONS[3];
            default:
                return ICONS[3];
        }
    }

    render() {
        const {type, title, text, visible} = this.props;
        if(visible) {
            if(!ACCEPT_TYPES.includes(type)) {
                throw new Error('The type attribute would be : ' + ACCEPT_TYPES);
            }
            return (
                <div className={`alert alert-${type}`}>
                    <h4><i className={`icon fa fa-${this._getIcon(type)}`}></i> {title ? title : 'Alerta!'}</h4>
                    {text}
                </div>
            );
        }
        return null;
    }
} 