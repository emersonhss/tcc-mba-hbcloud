import React, { Component } from 'react';
import jQuery from 'jquery';
import generateIdComponent from '../../helpers/generateIdComponent';
import convertColsClasses from '../../helpers/convertColsClasses';

const $ = jQuery;

export default class SelectAutoComplete extends Component {

    constructor(props){
        super(props);

        this.state = {
            id:  props.id ? props.id : generateIdComponent('select_'),
            expanded: false
        };

        this._toggleExpand = this._toggleExpand.bind(this);
    }

    componentDidMount(){
        const { id } = this.state;
        $(`#${id}`).select2();
      }

    _toggleExpand(event) {
        this.setState({ expanded: !this.state.expanded});
    }

    _renderRealOption(option, selectValue) {
        const label = typeof option === 'object' ? option.label : option;
        const value = typeof option === 'object' ? option.value : option;
        const disabled = typeof option === 'object' ? (option.disabled ? 'disabled' : '') : '';
        return <option key={`select-op-${value}`} value={value} selected={selectValue === value ? 'selected' : ''} disabled={disabled} onClick={this._toggleExpand}>{label}</option>;
    }

    _renderRealSelect(options, selectValue, onChange) {
        return (
            <select id={this.state.id} className="form-control select2 select2-hidden-accessible input-sm" 
                style={{width: '100%'}} tabindex="-1" aria-hidden="true"
                onChange={(e) => {/*onChange && onChange(e)*/ alert(e.target.value)}}>
                {options.map(option => this._renderRealOption(option, selectValue))}
            </select>
        );
    }

    _renderContainer(options, value) {
        if(value) {
            const optionSelected = typeof options === 'object' ? (options.filter(option => option.value === value )) : (options.filter(option => option === value ));
            const label = typeof optionSelected === 'object' ? optionSelected.label : optionSelected

            return <span className="select2-selection__rendered" id="select2-vbhn-container" title={label}>{value}</span>;
        }
        return <span className="select2-selection__rendered" id="select2-vbhn-container" title=""></span>;
    }

    render() {
        const {label, value, options, onChange, cols} = this.props;
        const classCols = convertColsClasses(cols);

        return (
            <div className={`form-group ${classCols}`}>
                {label ? <label>{label}</label> : ''}
                {this._renderRealSelect(options, value, onChange)}
              </div>
        );
    }
}