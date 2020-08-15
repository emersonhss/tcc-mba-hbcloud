import React, { Component } from 'react';
import Menu from './Menu';

export default class MainSidebar extends Component {

    render() {
        const { user, menuObject } = this.props;
        const menu = menuObject ? menuObject : [];
        return (
            <aside className="main-sidebar">
            {/* <!-- Left side column. contains the logo and sidebar --> */}

                {/* <!-- sidebar: style can be found in sidebar.less --> */}
                <section className="sidebar">

                    {/* <!-- Sidebar user panel (optional) --> */}
                    <div className="user-panel">
                    <div className="pull-left image">
                        <img src="https://almsaeedstudio.com/themes/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User"/>
                    </div>
                    <div className="pull-left info">
                        <p>{user.name}</p>
                        {/* <!-- Status --> */}
                        <a role="button"><i className="fa fa-circle text-success"></i> Online</a>
                    </div>
                    </div>

                    {/* <!-- search form (Optional) --> */}
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                            <input type="text" name="q" className="form-control" placeholder="Pesquisar..."/>
                            <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                    {/* <!-- /.search form --> */}

                    <Menu menuObject={menu} />
                    
                </section>
                {/* <!-- /.sidebar --> */}
            </aside>
        );   
    }

}