import React, { Component } from 'react'
import Loadable from "react-loadable";
import Loading from '../../../components/Loading';

const LoadComponent = Loadable({
    loader: () => import('./TournamentEditContainer'),
    loading: Loading
});

export default class TournamentEditRoute extends Component {

    render() {
        return <LoadComponent {...this.props} />
    }
}