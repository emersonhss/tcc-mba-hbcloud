import React, { Component } from 'react';
import generateIdComponent from '../../helpers/generateIdComponent';
import convertColsClasses from '../../helpers/convertColsClasses';

export default class Input extends Component {

    constructor(props){
        super(props);

        this.state = {
            id:  props.id ? props.id : generateIdComponent('input_'),
            type: props.type ? props.type : 'text'
        };
    }

    _renderLabel(){
        const {label} = this.props;
        return label ? <label htmlFor={this.state.id}>{label}</label> : '';
    }

    _renderInputGrupBefore(){
        const { groupBeforeRender } = this.props;
        if(groupBeforeRender) {
            return <span className="input-group-addon">{typeof groupBeforeRender === 'function' ? groupBeforeRender() : groupBeforeRender}</span>;
        }
        return null;
    }

    _renderInputGrupAfter(){
        const { groupAfterRender } = this.props;
        if(groupAfterRender) {
            return <span class="input-group-addon">{typeof groupAfterRender === 'function' ? groupAfterRender() : groupAfterRender}</span>;
        }
        return null;
    }

    _getGroupSizeClass(){
        const { size } = this.props;
        switch(size) {
            case 'small': 
                return 'input-group-sm';
            case 'large': 
                return 'input-group-lg';
            case 'default':
            default:
                return '';
        }
    }

    _getSizeClass(){
        const { size } = this.props;
        switch(size) {
            case 'small': 
                return 'input-sm';
            case 'large': 
                return 'input-lg';
            case 'default':
            default:
                return '';
        }
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
        const {value, placeholder, onChange, onBlur, cols, disabled} = this.props;
        const classCols = convertColsClasses(cols);
        
        return (
            <div className={`form-group ${classCols}`}>
                {this._renderLabel()}
                <div className={`input-group ${this._getGroupSizeClass()} ${this._getHighlightClass()} col-xs-12`}>
                    {this._renderInputGrupBefore()}
                    <input id={this.state.id} 
                        className={`form-control ${this._getSizeClass()}`} 
                        type={this.state.type} 
                        value={value} 
                        disabled={disabled ? 'disabled' : ''}
                        onChange={onChange} 
                        onBlur={onBlur}
                        placeholder={placeholder ? placeholder : ''} />
                    {this._renderInputGrupAfter()}
                    {this._renderHelpText()}
                </div>
            </div>
        );
    }
}