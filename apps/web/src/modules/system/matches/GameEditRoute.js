import React, { Component } from 'react'
import Loadable from "react-loadable";
import Loading from '../../../components/Loading';

const LoadComponent = Loadable({
    loader: () => import('./GameEditContainer'),
    loading: Loading
});

export default class GameOffEditRoute extends Component {

    render() {
        return <LoadComponent {...this.props} />
    }
}