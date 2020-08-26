import React, { Component } from 'react';
import generateIdComponent from '../../helpers/generateIdComponent';
import convertColsClasses from '../../helpers/convertColsClasses';
import './Switch.css';

export default class Switch extends Component {

    constructor(props){
        super(props);
        this.state = {
            id:  props.id ? props.id : generateIdComponent('switch_'),
        };
    }

    render() {
        const { label, value, disabled, cols, onClick } = this.props;
        const { id } = this.state;
        const classCols = convertColsClasses(cols);

        return (
            <div className={`${classCols}`}>
                <div className="custom-control custom-switch">
                    <input id={id} type="checkbox" value={value} disabled={disabled ? 'disabled' : ''} className="custom-control-input"  onClick={onClick} />
                    <label for={id} className="custom-control-label">{label}</label>
                </div>
            </div>
        );
    }
}