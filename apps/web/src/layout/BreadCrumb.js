import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BreadCrumb extends Component {
    
    _mapBreadcrumb(bcArray) {
        return bcArray.map((crumb, index) => {
            const iconFirst = index === 0 ? <i className="fa fa-home"></i> : '';
            const linkOrTitle = crumb.link ? <Link to={crumb.link}>{iconFirst} {crumb.title}</Link> : `${iconFirst} ${crumb.title}`;
            const activeClass = crumb.active || index === (bcArray.length - 1) ? 'active' : '';
            return <li key={`breacCrumb_${index}`} className={activeClass}>{linkOrTitle}</li>;
        });
    };

    render() {
        const { arrayModel } = this.props;
        return (
            <ol className="breadcrumb">
                {this._mapBreadcrumb(arrayModel)}
            </ol>
        );
    }
}