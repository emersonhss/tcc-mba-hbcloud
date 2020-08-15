import React, { Component } from 'react';
import Icon from '../layout/Icon';
import './HCModal.css';

export default class HCModal extends Component {

    _renderOnBackHeader(onBack) {
        if(onBack && typeof onBack === 'function') {
            return (
                <span className="pull-left">
                    <a role="button" onClick={(e) => {onBack()}}><Icon type="fa" name="chevron-left" /></a>
                </span>
            );
        }
        return null;
    }

    _renderOnCloseHeader(onClose) {
        if(onClose && typeof onClose === 'function') {
            return (
                <span className="pull-right">
                    <a role="button" onClick={(e) => {onClose()}}><Icon type="fa" name="times" /></a>
                </span>
            );
        }
        return null;
    }

    _getClassContentBySize(size) {
        switch(size) {
            case 'small':
                return `hc-modal-overlay-content-sm`;
            case 'large':
            default:
                return `hc-modal-overlay-content-lg`;
        }
    }

    _renderFooterComponent(footerComponent) {
        if(footerComponent){
            return (
                <div className="hc-modal-overlay-content-footer">
                    {footerComponent}
                </div>
            );
        }
        return null;
    }
    
    render() {
        const { title, show, size, onBack, onClose, footerComponent } = this.props;

        if(show) {
            return (
                <div className="hc-modal-overlay">
                    <div className={this._getClassContentBySize(size)}>
                        <div className="hc-modal-overlay-content-header">
                            {this._renderOnBackHeader(onBack)}
                            <h4>{title}</h4>
                            {this._renderOnCloseHeader(onClose)}
                        </div>
                        <div className="hc-modal-overlay-content-body">
                            {this.props.children}
                        </div>
                        {this._renderFooterComponent(footerComponent)}
                    </div>
                </div>
            );
        }
        return null;
    }

}