import React, { Component } from 'react';

export default class ControlSidebar extends Component {

    render() {
        return ([
            <aside key="controlSideBar" className="control-sidebar control-sidebar-dark">
                {/* <!-- The Right Sidebar --> */}
                {/* <!-- Content of the sidebar goes here --> */}
                <button className="btn btn-default" data-toggle="control-sidebar">Toggle Right Sidebar</button>
            </aside>,
            <div key="controlSideBarBg" className="control-sidebar-bg">
            {/* <!-- The sidebar's background --> */}
            {/* <!-- This div must placed right after the sidebar for it to work--> */}
            </div>]
        );
    }

}