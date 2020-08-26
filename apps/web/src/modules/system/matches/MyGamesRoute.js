import React, { Component } from 'react'
import Loadable from "react-loadable";
import Loading from '../../../components/Loading';

const LoadComponent = Loadable({
    loader: () => import('./MyGamesContainer'),
    loading: Loading
});

export default class MyGamesRoute extends Component {

    render() {
        return <LoadComponent {...this.props} />
    }
}