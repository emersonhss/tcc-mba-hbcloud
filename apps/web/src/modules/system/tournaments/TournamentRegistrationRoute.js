import React, { Component } from 'react'
import Loadable from "react-loadable";
import Loading from '../../../components/Loading';

const LoadComponent = Loadable({
    loader: () => import('./TournamentRegistrationContainer'),
    loading: Loading
});

export default class TournamentRegistrationRoute extends Component {

    render() {
        return <LoadComponent {...this.props} />
    }
}