import React from 'react';

export default (props) => {
    return (
        <footer className="main-footer">
            <div className="pull-right hidden-xs">
                <b>Version</b> {props.version}
            </div>
            <strong>Copyright © {props.years} <a href={props.enterpriseUrl}>{props.enterprise}</a>.</strong> All rights
            reserved.
        </footer>
    );
}