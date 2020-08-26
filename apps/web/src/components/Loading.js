import React, { Component } from 'react';
import Icon from '../layout/Icon';
import './Loading.css';

export default class Loading extends Component {

    render(){
        return (
            <div className="loading-overlay">
                <Icon type="fa" name="sync" size="2" className="fa-spin" />
            </div>
        )
    }
}