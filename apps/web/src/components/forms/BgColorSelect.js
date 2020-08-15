import React, { Component } from 'react';
import Icon from '../../layout/Icon';
import './BgColorSelect.css';

const OPTIONS_BG_COLORS = [
    {
        label: 'Nenhuma cor',
        value: '',
    },
    {
        label: 'Vermelho',
        value: 'red',
    },
    {
        label: 'Amarelo',
        value: 'yellow',
    },
    {
        label: 'Áqua',
        value: 'aqua',
    },
    {
        label: 'Azul',
        value: 'blue',
    },
    {
        label: 'Azul Claro',
        value: 'light-blue',
    },
    {
        label: 'Verde',
        value: 'green',
    },
    {
        label: 'Dourado',
        value: 'gold',
    },
    {
        label: 'Azul Marinho',
        value: 'navy',
    },
    {
        label: 'Verde-azulado',
        value: 'teal',
    },
    {
        label: 'Verde-oliva',
        value: 'olive',
    },
    {
        label: 'Lima',
        value: 'lime',
    },
    {
        label: 'Laranja',
        value: 'orange',
    },
    {
        label: 'Vermelho Púrpura',
        value: 'fuchsia',
    },
    {
        label: 'Roxo',
        value: 'purple',
    },
    {
        label: 'Bordô',
        value: 'maroon',
    },
    {
        label: 'Preto',
        value: 'black',
    }
];

export default class BgColorSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        this._renderOption = this._renderOption.bind(this);
        this._close = this._close.bind(this);
        this._click = this._click.bind(this);
        this._dblClick = this._dblClick.bind(this);
    }

    _close() {
        this.setState({show: false});
    }

    _click(value) {
        const {onChange} = this.props;
        onChange && onChange(value);
    }

    _dblClick(value) {
        this._click(value);
        this._close();
    }

    _renderOption(option, value)  {
        
        return (
            <li key={`select-color-op-${option.value}`} className={`bg-${option.value}`}>
                <a role="button" onClick={(e) => this._click(option.value)} onDoubleClick={(e) => this._dblClick(option.value)}>
                    <span>{option.label}</span>{' '}
                    <span className={`pull-right`}>{(value === option.value || (!option.value && !value)) ? <Icon type="fa" name="check" /> : ''}</span>
                </a>
            </li>
        );
    }

    _renderSelect(label, value){
        if(this.state.show) {
            return (
                <div className="bg-color-select-content">
                    <div className="bg-color-select-options">
                        <div className="bg-color-select-options-header">
                            <h4>{label ? label : 'Selecione a Cor'}</h4>
                            <span className="pull-right">
                                <a role="button" onClick={(e) => this._close()}><Icon type="fa" name="times" /></a>
                            </span>
                        </div>
                        <div className="bg-color-select-options-list box-footer no-padding">
                            <ul className="nav nav-stacked">
                                {OPTIONS_BG_COLORS.map(option => this._renderOption(option, value))}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        const {label, value, className} = this.props;
        return (
            <div className={`bg-color-select ${className ? className : ''}`}>
                <a role="button" onClick={(e) => this.setState({show: true})}><Icon type="fa" name="fill-drip" /> {label}</a>
                {this._renderSelect(label, value)}
            </div>
        );
    }
}