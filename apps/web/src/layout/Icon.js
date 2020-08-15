import React, { Component } from 'react'

export default class Icon extends Component {

    render() {
        const {type, name, className, size, alt, title, color} = this.props;
        const style = {};
        if(color) {
            style.color = color;
        }
        switch(type) {
            case 'fa':
            case 'fab':
            case 'far': {
                const fontSizeClass = size ? `fa-${size}x` : '';
                return <i className={`${type} fa-${name} ${fontSizeClass} ${className ? className : ''}`}
                            alt={alt ? alt : ''} title={title ? title : ''} style={style}></i>;
            } 
            default:
                throw Error('Não foi selecionado um tipo de ícone adequado.');
        }
    }
}