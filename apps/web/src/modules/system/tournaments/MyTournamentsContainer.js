import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Content from '../../../layout/Content';
import BreadCrumb from '../../../layout/BreadCrumb';
import Alert from '../../../components/Alert';
import TournamentItemList from './components/TournamentItemList';

const breadcrumb = [
    {
        link: '/',
        title: 'Início'
    },
    {
        link: '/competicoes',
        title: 'Competições'
    },
    {
        title: 'Minhas Competições',
        active: true
    }
  ];

@inject("routerStore")
@inject("tournamentStore")
@observer
export default class MyTournamentsContainer extends Component {

    state = {
        baseLink : '',
    };

    constructor(props){
        super(props);
        this._renderListTournaments = this._renderListTournaments.bind(this);
    }

    componentDidMount() {
        this.props.tournamentStore.listTournaments();
        this.setState({ baseLink: this.props.match.url });
    }

    _renderListTournaments() {
        console.log(this.props.tournamentStore.tournaments);
        return this.props.tournamentStore.tournaments.map(tournament => (
            <TournamentItemList key={`tournament_${tournament._id}`} tournament={tournament} baseLink={this.state.baseLink} />
        ));
    }    

    render() {
        const { message } = this.props.tournamentStore;

        return (
            <Content title="Minhas Competições" subtitle="Confira as competições registradas por você." breadCrumb={<BreadCrumb arrayModel={breadcrumb} />} >
                <Alert visible={message} type={message ? message.type :  ''} text={message ? message.text :  ''} />
                
                <div className="row">
                    {this._renderListTournaments()}
                </div>
            </Content>
        );
    }
}