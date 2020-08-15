import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import MainHeader from '../../layout/MainHeader';
import MainSidebar from '../../layout/MainSidebar';
import ControlSidebar from '../../layout/ControlSidebar';
import MainFooter from '../../layout/MainFooter';
import Inicio from '../../views/Inicio';
import SerAtleta from '../../views/SerAtleta';
import ComoAtleta from '../../views/ComoAtleta';
import NovoTime from '../../views/NovoTime';
import MeusTimes from '../../views/MeusTimes';
import NovaCompeticao from '../../views/NovaCompeticao';
import MinhasCompeticoes from '../../views/MinhasCompeticoes';
import GameEditRoute from './matches/GameEditRoute';
import MyMatchesRoute from './matches/MyGamesRoute';
import TransictionPage from '../../components/TransictionPage';
import TournamentEditRoute from './tournaments/TournamentEditRoute';
import MyTournamentsRoute from './tournaments/MyTournamentsRoute';
import TournamentRegistrationRoute from './tournaments/TournamentRegistrationRoute';
import MyTournamentsRegistrationsRoute from './tournaments/MyTournamentsRegistrationsRoute';

import { withKeycloak } from 'react-keycloak';

const MENUS = [
    {
        title: 'Competições',
        icon: '',
        link: '',
        alias: 'competicoes',
        submenus: [
            {
                title: 'Nova Competição',
                icon: '',
                link: '/competicoes/nova',
                alias: 'nova-competicao'
            },
            {
                title: 'Minhas Competições',
                icon: '',
                link: '/competicoes',
                alias: 'minhas-competicoes'
            },
            {
                title: 'Minhas Inscrições',
                icon: '',
                link: '/competicoes/minhas-inscricoes',
                alias: 'minhas-inscricoes'
            }
        ]
    },
    {
        title: 'Partidas',
        icon: '',
        link: '',
        alias: 'partidas',
        submenus: [
            {
                title: 'Nova Partida',
                icon: '',
                link: '/partidas/nova',
                alias: 'nova-partida'
            },
            {
                title: 'Minhas Partidas',
                icon: '',
                link: '/partidas',
                alias: 'minhas-partidas'
            }
        ]
    }
];

@inject("userStore")
@inject('routerStore')
@observer
class System extends Component {

    render() {
        const { userStore, match, keycloak, history } = this.props;
        console.log("Keycloak System:", keycloak);
        console.log("MatchURL:",match.url);
        if(keycloak.authenticated) {
            return (
                <div className="wrapper">
                    <MainHeader user={userStore.user} history={history} />
                    <MainSidebar user={userStore.user} menuObject={MENUS} />
                    <ControlSidebar />
                    <Switch>
                        <Route exact path={`${match.url}/`} component={Inicio} />
                        <Route path={`${match.url}competicoes/minhas-inscricoes`} component={MyTournamentsRegistrationsRoute} />
                        <Route path={`${match.url}competicoes/:id/inscricao/:view/:viewAction`} component={TournamentRegistrationRoute} />
                        <Route path={`${match.url}competicoes/:id/inscricao/:view`} component={TournamentRegistrationRoute} />
                        <Route path={`${match.url}competicoes/:id/:view`} component={TournamentEditRoute} />
                        <Route path={`${match.url}competicoes/:id`} component={TournamentEditRoute} />
                        <Route path={`${match.url}competicoes`} component={MyTournamentsRoute} />
                        <Route path={`${match.url}partidas/:id/:view`} component={GameEditRoute} />
                        <Route path={`${match.url}partidas/:id`} component={GameEditRoute} />
                        <Route path={`${match.url}partidas`} component={MyMatchesRoute} />
                    </Switch>
                    <MainFooter years="2020" enterprise="Handball.cloud" enterpriseUrl="http://handball.cloud" version="0.1.0" />
                </div>
            );
        } else {
            return <TransictionPage />;
        }
    }
    
}

export default withKeycloak(System);