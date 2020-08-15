import React, { Component } from 'react';
import convertColsClasses from '../../helpers/convertColsClasses';
import generateIdComponent from '../../helpers/generateIdComponent';

export default class TextArea extends Component {

    constructor(props){
        super(props);

        this.state = {
            id:  props.id ? props.id : generateIdComponent('txt_'),
        };
    }

    _getHighlightClass() {
        const {highligth} = this.props;
        switch(highligth) {
            case 'success':
            case 'warning': 
            case 'error':  
                return `has-${highligth}`;
            case 'default':
            default:
                return '';
        }
    }

    _renderHelpText() {
        const {helpText} = this.props;
        return helpText ? <p class="help-block">{helpText}</p> : '';
    }

    render() {

        const {value, placeholder, label, rows, onChange, onBlur, cols, disabled} = this.props;
        const classCols = convertColsClasses(cols);
        return (
            <div className={`form-group ${classCols}`}>
                {label ? <label>{label}</label> : null}
                <textarea id={this.state.id} 
                    className={`form-control ${this._getHighlightClass()} col-xs-12`} 
                    disabled={disabled ? 'disabled' : ''}
                    rows={rows ? rows : 3} 
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ? value : ''}>
                </textarea>
                {this._renderHelpText()}
            </div>
        )
    }
}