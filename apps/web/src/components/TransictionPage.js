import React, { Component } from 'react';
import Icon from '../layout/Icon';
import LogoImg from '../assets/imgs/logo-w200px.png';
import './TransictionPage.css';

export default class TransictionPage extends Component {

    render() {
        return (
            <div className="transiction-page">
                <div className="transiction-page-content">
                    <img alt="HandBall.cloud" src={LogoImg} />
                    <div><p><Icon type="fa" name="sync" className="fa-spin" /> Aguarde...</p></div>
                </div>
            </div>
        );
    }
}