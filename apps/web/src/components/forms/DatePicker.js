import React, { Component } from 'react';
import jQuery from 'jquery';
import generateIdComponent from '../../helpers/generateIdComponent';
import convertColsClasses from '../../helpers/convertColsClasses';

const $ = jQuery;

export default class DatePicker extends Component {

    constructor(props){
        super(props);

        this.state = {
            id:  props.id ? props.id : generateIdComponent('datepicker_')
        };
    }

    componentDidMount() {
        // $.fn.datepicker.defaults.format = 'dd/mm/yyyy';
        // $.fn.datepicker.defaults.language = 'pt-BR';
        $.fn.datepicker.dates['en'] = {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear",
            format: "mm/dd/yyyy",
            titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
            weekStart: 0
        };

        $.fn.datepicker.dates['pt-BR'] = {
            days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            daysMin: ["Do", "Sg", "Te", "Qa", "Qi", "Sx", "Sa"],
            months: ["Janeiro", "Fevereiro", "Março", "Abril", "Mail", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Aug", "Set", "Out", "Nov", "Dez"],
            today: "Hoje",
            clear: "Limpar",
            format: "dd/mm/yyyy",
            titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
            weekStart: 0
        };


        $('.datepicker').datepicker({
            language: 'pt-BR'
        });

        $.fn.datepicker.defaults.language = 'pt-BR';
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
        return helpText ? <p className="help-block">{helpText}</p> : '';
    }

    render() {
        const {value, placeholder, onChange, cols, size, disabled} = this.props;
        const classCols = convertColsClasses(cols);
        
        return (
            <div className={`${size !== 'small' ? 'form-group' : ''} ${classCols}`}>
                {this._renderLabel()}
                <div className={`input-group date ${this._getGroupSizeClass()} ${this._getHighlightClass()}`} data-provide="datepicker">
                    {this._renderInputGrupBefore()}
                    <input id={this.state.id} 
                        className={`form-control ${this._getSizeClass()} datepicker`} 
                        type="text" 
                        value={value} 
                        disabled={disabled ? 'disabled' : ''}
                        onChange={onChange}
                        onBlur={onChange} 
                        placeholder={placeholder ? placeholder : ''} />
                    <div className="input-group-addon">
                        <span className="glyphicon glyphicon-th"></span>
                    </div>
                    {this._renderHelpText()}
                </div>
            </div>
        );
    }
}