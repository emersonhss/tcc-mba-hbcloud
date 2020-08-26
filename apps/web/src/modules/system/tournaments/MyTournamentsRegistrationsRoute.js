import React, { Component } from 'react'
import Loadable from "react-loadable";
import Loading from '../../../components/Loading';

const LoadComponent = Loadable({
    loader: () => import('./MyTournamentsRegistrationsContainer'),
    loading: Loading
});

export default class MyTournamentsRegistrationsRoute extends Component {

    render() {
        return <LoadComponent {...this.props} />
    }
}