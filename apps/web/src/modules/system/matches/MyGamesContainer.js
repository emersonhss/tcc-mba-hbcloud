import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Content from '../../../layout/Content';
import BreadCrumb from '../../../layout/BreadCrumb';
import Alert from '../../../components/Alert';
import GameItemList from './components/GameItemList';

const breadcrumb = [
    {
        link: '/',
        title: 'Início'
    },
    {
        link: '/partidas',
        title: 'Partidas'
    },
    {
        title: 'Minhas Partidas',
        active: true
    }
  ];

@inject("routerStore")
@inject("gameStore")
@observer
export default class MyGamesContainer extends Component {

    state = {
        baseLink : '',
    };

    constructor(props){
        super(props);
        this._renderListGames = this._renderListGames.bind(this);
    }

    componentDidMount() {
        this.props.gameStore.listGames();
        this.setState({ baseLink: this.props.match.url });
    }

    _renderListGames() {
        console.log(this.props.gameStore.games);
        return this.props.gameStore.games.map(game => (
            <GameItemList key={`game_${game._id}`} game={game} baseLink={this.state.baseLink} />
        ));
    }    

    render() {
        const { message } = this.props.gameStore;

        return (
            <Content title="Minhas Partidas" subtitle="Confira as partidas registradas por você." breadCrumb={<BreadCrumb arrayModel={breadcrumb} />} >
                <Alert visible={message} type={message ? message.type :  ''} text={message ? message.text :  ''} />
                
                <div className="row">
                    {this._renderListGames()}
                </div>
            </Content>
        );
    }
}