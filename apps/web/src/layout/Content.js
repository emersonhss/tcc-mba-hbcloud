import React, { Component } from 'react';

export default class Content extends Component {

    render() {
        const { className } = this.props;
        return (
            <div className={`content-wrapper ${className ? className : ''}`}>
                <section className="content-header">
                    <h1>
                        {this.props.title}
                        <small>{this.props.subtitle}</small>
                    </h1>
                    {this.props.breadCrumb ? this.props.breadCrumb : ''}
                </section>

                <section className="content">
                    {this.props.children}
                </section>
            </div>
        );
    }

}