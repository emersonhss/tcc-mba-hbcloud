import React, { Component } from 'react';
import generateIdComponent from '../../helpers/generateIdComponent';
import convertColsClasses from '../../helpers/convertColsClasses';

export default class SelectAutoComplete extends Component {

    constructor(props){
        super(props);

        this.state = {
            id:  props.id ? props.id : generateIdComponent('select_')
        };
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

    _renderRealOption(option, selectValue) {
        const label = typeof option === 'object' ? option.label : option;
        const value = typeof option === 'object' ? option.value : option;
        const disabled = typeof option === 'object' ? (option.disabled ? 'disabled' : '') : '';
        const selected = typeof option === 'object' ? (selectValue === value ? 'selected' : '') : '';
        return <option key={`select-op-${value}`} value={value} disabled={disabled} onClick={this._toggleExpand}>{label}</option>;
    }

    _renderRealSelect(options, selectValue, onChange, disabled) {
        return (
            <select id={this.state.id} className={`form-control ${this._getSizeClass()}`} 
                style={{width: '100%'}} aria-hidden="true" value={selectValue}
                disabled={disabled ? 'disabled' : ''}
                onChange={(e) => { onChange && onChange(e) }}>
                {options.map(option => this._renderRealOption(option, selectValue))}
            </select>
        );
    }

    render() {
        const {label, value, options, disabled, onChange, cols} = this.props;
        const classCols = convertColsClasses(cols);

        return (
            <div className={`form-group ${classCols}`}>
                {label ? <label>{label}</label> : ''}
                {this._renderRealSelect(options, value, onChange, disabled)}
            </div>
        );
    }
}