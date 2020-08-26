import React, { Component } from 'react'
import Loadable from "react-loadable";
import Loading from '../../../components/Loading';

const LoadComponent = Loadable({
    loader: () => import('./MyTournamentsContainer'),
    loading: Loading
});

export default class MyTournamentsRoute extends Component {

    render() {
        return <LoadComponent {...this.props} />
    }
}