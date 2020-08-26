import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Content from '../../../layout/Content';
import BreadCrumb from '../../../layout/BreadCrumb';
import BoxWidget from '../../../layout/BoxWidget';
import TeamGame from './components/TeamGame';
import GameSettings from './components/GameSettings';
import Alert from '../../../components/Alert';
import DatePicker from '../../../components/forms/DatePicker';
import Input from '../../../components/forms/Input';
import Select from '../../../components/forms/Select';
import Icon from '../../../layout/Icon';
import NavTabs, { NavTabItem } from '../../../components/NavTabs';
import TransictionPage from '../../../components/TransictionPage';
import { FIRST_TIME, SECOND_TIME, OVERTIME_ONE, OVERTIME_TWO } from '../constants/match-times';
import ExecuteGame from './components/ExecuteGame';
import GameTimeline from './components/GameTimeline';
import SUITS from '../constants/suits';
import CATEGORIES from '../constants/categories';

const BASE_URI = '/app/partidas';

const getBreadCrumb = (title) => {
    return [
        {
            link: '/',
            title: 'Início'
        },
        {
            link: '/partidas',
            title: 'Partidas'
        },
        {
            title,
            active: true
        }
      ];
}

@inject("routerStore")
@inject("gameStore")
@observer
export default class GameEditContainer extends Component {

    state = {
        viewGameId: undefined,
        viewType: undefined,
        showExecuteGame: false,
    };

    constructor(props){
        super(props);
        this._onChangeFieldTeam = this._onChangeFieldTeam.bind(this);
        this._addTeamMember = this._addTeamMember.bind(this);
        this._removeTeamMember = this._removeTeamMember.bind(this);
        this._changeFieldValueMember = this._changeFieldValueMember.bind(this);
        this._addTeamGoal = this._addTeamGoal.bind(this);
        this._editTeamGoal = this._editTeamGoal.bind(this);
        this._removeTeamGoal = this._removeTeamGoal.bind(this);
        this._addTeamWarning = this._addTeamWarning.bind(this);
        this._editTeamWarning = this._editTeamWarning.bind(this);
        this._removeTeamWarning = this._removeTeamWarning.bind(this);
        this._addTeamExclusion = this._addTeamExclusion.bind(this);
        this._editTeamExclusion = this._editTeamExclusion.bind(this);
        this._removeTeamExclusion = this._removeTeamExclusion.bind(this);
        this._addTeamDisqualification = this._addTeamDisqualification.bind(this);
        this._editTeamDisqualification = this._editTeamDisqualification.bind(this);
        this._removeTeamDisqualification = this._removeTeamDisqualification.bind(this);
        this._addTeamTechnicalTime = this._addTeamTechnicalTime.bind(this);
        this._editTeamTechnicalTime = this._editTeamTechnicalTime.bind(this);
        this._removeTeamTechnicalTime = this._removeTeamTechnicalTime.bind(this);
        this._updateFieldGameSettings = this._updateFieldGameSettings.bind(this);
        this._saveGame = this._saveGame.bind(this);
        this._editGame = this._editGame.bind(this);
        this._init = this._init.bind(this);
    }

    componentDidMount() {
        console.log('Montando tela de partida...');
        const { viewGameId, viewType } = this.state;
        const { id, view } = this.props.match.params;
        const newState = {...this.state};

        let hasChange = false;
        if (viewGameId !== id) {
            newState.viewGameId = id;
            hasChange = true;
        } 

        if (viewType !== view) {
            newState.viewType = view;
            hasChange = true;
        } 
        
        if (hasChange) {
            this.setState(newState);
        } 
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { id } = nextProps.match.params;
        const { viewGameId, viewType } = this.state;
        if (viewGameId !== nextState.viewGameId || viewType !== nextState.viewType) {
            // Significa mudança de view.
            console.log('Mudança de estado...');
            this._init(nextState);
            window.scrollTo(0, 0);
        }

        if (viewGameId !== id) {
            this.setState({ viewGameId: id });
        }

        return true;
    }

    _init(newState) {
        const { viewGameId, viewType } = newState;
        console.log('Abrindo tela de partida no modo:', viewType);
        if (viewGameId && viewGameId !== 'nova') {
            if(viewType === 'edit') {
                console.log('Editar partida...', viewGameId);
                this.props.gameStore.editGame(viewGameId);
            } else {
                console.log('Ver partida...', viewGameId);
                this.props.gameStore.viewGame(viewGameId);
            }
        } else {
            console.log('Criar nova partida...');
            this.props.gameStore.newGame();
        } 
    }

    _getClassGols(teamTag, team) {
        if(teamTag === 'A') {
            return team.goals > this.props.gameStore.game.bTeam.goals ? 'bg-success' : (team.goals < this.props.gameStore.game.bTeam.goals ? 'bg-danger' : '');
        } else if (teamTag === 'B') {
            return team.goals > this.props.gameStore.game.aTeam.goals ? 'bg-success' : (team.goals < this.props.gameStore.game.aTeam.goals ? 'bg-danger' : '');
        }
        return '';   
    }

    _onChangeFieldTeam(team, field, value) {
        this.props.gameStore.updateFieldTeam(team, field, value);
    }

    _addTeamMember(team) {
        this.props.gameStore.addNewMemberTeam(team);
    }

    _removeTeamMember(team, member) {
        this.props.gameStore.removeMemberTeam(team, member);
    }

    _changeFieldValueMember(team, index, field, value) {
        this.props.gameStore.changeFieldMemberTeam(team, index, field, value);
    }

    _addTeamGoal(team, goal) {
        return this.props.gameStore.addTeamGoal(team, goal);
    }

    _editTeamGoal(team, matchTime, index, goal) {
        return this.props.gameStore.editTeamGoal(team, matchTime, index, goal);
    }

    _removeTeamGoal(team, goal) {
        return this.props.gameStore.removeTeamGoal(team, goal);
    }

    _addTeamWarning(team, warning) {
        return this.props.gameStore.addTeamWarning(team, warning);
    }

    _editTeamWarning(team, matchTime, index, warning) {
        return this.props.gameStore.editTeamWarning(team, matchTime, index, warning);
    }

    _removeTeamWarning(team, warning) {
        return this.props.gameStore.removeTeamWarning(team, warning);
    }

    _addTeamExclusion(team, exclusion) {
        return this.props.gameStore.addTeamExclusion(team, exclusion);
    }

    _editTeamExclusion(team, matchTime, index, exclusion) {
        return this.props.gameStore.editTeamExclusion(team, matchTime, index, exclusion);
    }

    _removeTeamExclusion(team, exclusion) {
        return this.props.gameStore.removeTeamExclusion(team, exclusion);
    }

    _addTeamDisqualification(team, disqualification) {
        return this.props.gameStore.addTeamDisqualification(team, disqualification);
    }

    _editTeamDisqualification(team, matchTime, index, disqualification) {
        return this.props.gameStore.editTeamDisqualification(team, matchTime, index, disqualification);
    }

    _removeTeamDisqualification(team, disqualification) {
        return this.props.gameStore.removeTeamDisqualification(team, disqualification);
    }
    
    _addTeamTechnicalTime(team, technicalTime) {
        return this.props.gameStore.addTeamTechnicalTime(team, technicalTime);
    }

    _editTeamTechnicalTime(team, matchTime, index, technicalTime) {
        return this.props.gameStore.editTeamTechnicalTime(team, matchTime, index, technicalTime);
    }

    _removeTeamTechnicalTime(team, technicalTime) {
        return this.props.gameStore.removeTeamTechnicalTime(team, technicalTime);
    }

    _updateFieldGameSettings(field, value) {
        this.props.gameStore.updateFieldGameSettings(field, value);
    }

    async _saveGame() {
        if( await this.props.gameStore.saveGame()) {
            console.log('Redirencionando para view');
            this.props.history.push(`${BASE_URI}/${this.props.gameStore.game._id}`);
            this.setState({ viewType: undefined, viewGameId: this.props.gameStore.game._id, showExecuteGame: false });
        }
    }

    _editGame() {
        this.props.history.push(`${BASE_URI}/${this.state.viewGameId}/edit`);
        this.setState({ viewType: 'edit' });
    }

    _cancel() {
        this.props.history.push(BASE_URI);
    }

    _renderStartButton() {
        if (this.props.gameStore.edit && !this.props.gameStore.game.isStarted()) {
            return <button type="button" className="btn btn-primary" onClick={() => this.setState({ showExecuteGame: !this.state.showExecuteGame })}><Icon type="fa" name="clock" /> Iniciar</button>
        }
        return null;
    }

    _renderButtons() {
        if (!this.props.gameStore.edit) {
            return (
                <div className="form-group-buttons">
                    <div className="buttons-left">
                        <button type="button" className="btn btn-default" onClick={() => this._cancel()}>Cancelar</button>
                    </div>

                    <div className="buttons-right">
                        <button type="button" className="btn btn-primary" onClick={() => this._editGame()}><Icon type="fa" name="edit" /> Editar</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="form-group-buttons">
                    <div className="buttons-left">
                        <button type="button" className="btn btn-default" onClick={() => this._cancel()}>Cancelar</button>
                    </div>

                    <div className="buttons-right">
                        {this._renderStartButton()}
                        <button type="button" className="btn btn-primary" onClick={() => this._saveGame()}><Icon type="fa" name="check" /> Salvar</button>
                    </div>
                </div>
            );
        }
    }

    render() {
        const { viewType, viewGameId, showExecuteGame } = this.state;
        console.log('View:', viewType, viewGameId);
        if (!viewType && !viewGameId) {
            return <TransictionPage />;
        }

        const { game, edit, message } = this.props.gameStore;
        const { aTeam, bTeam } = game;
        const titlePage = edit ? (game._id ? 'Editar Partida' : 'Nova Partida') : 'Detalhes da Partida';
        const subTitlePage = edit ? (game._id ? 'Edite a partida.' : 'Cadastre uma nova partida.') : 'Ver detalhes da partida';
        
        return (
            <Content title={titlePage} subtitle={subTitlePage} breadCrumb={<BreadCrumb arrayModel={getBreadCrumb(titlePage)} />} >
                <Alert visible={message} type={message ? message.type :  ''} text={message ? message.text :  ''} />

                <NavTabs onSettings={() => this.setState({ showSettings: true })}>
                    <NavTabItem active={true} tabName={'partida'} label="Partida">
                        <div className="row">
                            <BoxWidget id="nova_partida_agendamento" title="Agendamento"
                                type="default" cols="12 6">
                                <DatePicker cols='6' size="small" 
                                    value={game.date} 
                                    placeholder="Data da Partida" 
                                    disabled={!edit}
                                    onChange={e => this.props.gameStore.updateField('date', e.target.value)} />
                                <Input cols='6' type="text" size="small"
                                    placeholder={`Hora`}
                                    value={game.time} 
                                    disabled={!edit}
                                    onChange={(e) => this.props.gameStore.updateField('time', e.target.value)} 
                                    groupBeforeRender={() => <Icon type="fa" name="clock" />} />
                            </BoxWidget>
                            <BoxWidget id="nova_partida_localizacao" title="Localização"
                                type="default" cols="12 6">
                                <Input type="text" cols='12' size="small"
                                    placeholder={`Localidade da partida`}
                                    value={game.locality} 
                                    disabled={!edit}
                                    onChange={(e) => this.props.gameStore.updateField('locality', e.target.value)} 
                                    groupBeforeRender={() => <Icon type="fa" name="map-marker-alt" />} />
                            </BoxWidget>
                            <BoxWidget id="nova_partida_categoria" title="Categoria"
                                type="default" cols="12 6">
                                <Select cols="5" 
                                    options={SUITS} 
                                    disabled={!edit}
                                    value={game.suit} 
                                    size="small" 
                                    onChange={e => this.props.gameStore.updateField('suit', e.target.value)} />
                                <Select cols="7" 
                                    options={CATEGORIES} 
                                    disabled={!edit}
                                    value={game.category} 
                                    size="small" 
                                    onChange={e => this.props.gameStore.updateField('category', e.target.value)} />
                            </BoxWidget>
                            <BoxWidget id="nova_partida_competicao" title="Competição"
                                type="default" cols="12 6">
                                <Input type="text" cols='12' size="small"
                                    placeholder={`Competição`}
                                    value={game.tournament} 
                                    disabled={!edit}
                                    onChange={(e) => this.props.gameStore.updateField('tournament', e.target.value)} 
                                    groupBeforeRender={() => <Icon type="fa" name="trophy" />} />
                            </BoxWidget>
                        </div>
                        <div className="row">
                            <BoxWidget id="nova_partida_equipeA" title="Equipe A"
                                type="default" cols="12 12 6">

                                <TeamGame team={aTeam} teamTag="A" edit={edit} 
                                    onChangeFieldTeam={this._onChangeFieldTeam}
                                    addTeamMember={this._addTeamMember}
                                    removeTeamMember={this._removeTeamMember}
                                    changeFieldValueMember={this._changeFieldValueMember}
                                    addTeamGoal={this._addTeamGoal}
                                    editTeamGoal={this._editTeamGoal}
                                    removeTeamGoal={this._removeTeamGoal}
                                    addTeamWarning={this._addTeamWarning}
                                    editTeamWarning={this._editTeamWarning}
                                    removeTeamWarning={this._removeTeamWarning}
                                    addTeamExclusion={this._addTeamExclusion}
                                    editTeamExclusion={this._editTeamExclusion}
                                    removeTeamExclusion={this._removeTeamExclusion}
                                    addTeamDisqualification={this._addTeamDisqualification}
                                    editTeamDisqualification={this._editTeamDisqualification}
                                    removeTeamDisqualification={this._removeTeamDisqualification}
                                    addTeamTechnicalTime={this._addTeamTechnicalTime}
                                    editTeamTechnicalTime={this._editTeamTechnicalTime}
                                    removeTeamTechnicalTime={this._removeTeamTechnicalTime}
                                    classGols={this._getClassGols("A", this.props.gameStore.game.aTeam)} />
                            </BoxWidget>
                            <BoxWidget id="nova_partida_equipeB" title="Equipe B"
                                type="default" cols="12 12 6">

                                <TeamGame team={bTeam} teamTag="B" edit={edit} 
                                    onChangeFieldTeam={this._onChangeFieldTeam}
                                    addTeamMember={this._addTeamMember}
                                    removeTeamMember={this._removeTeamMember}
                                    changeFieldValueMember={this._changeFieldValueMember}
                                    addTeamGoal={this._addTeamGoal}
                                    editTeamGoal={this._editTeamGoal}
                                    removeTeamGoal={this._removeTeamGoal}
                                    addTeamWarning={this._addTeamWarning}
                                    editTeamWarning={this._editTeamWarning}
                                    removeTeamWarning={this._removeTeamWarning}
                                    addTeamExclusion={this._addTeamExclusion}
                                    editTeamExclusion={this._editTeamExclusion}
                                    removeTeamExclusion={this._removeTeamExclusion}
                                    addTeamDisqualification={this._addTeamDisqualification}
                                    editTeamDisqualification={this._editTeamDisqualification}
                                    removeTeamDisqualification={this._removeTeamDisqualification}
                                    addTeamTechnicalTime={this._addTeamTechnicalTime}
                                    editTeamTechnicalTime={this._editTeamTechnicalTime}
                                    removeTeamTechnicalTime={this._removeTeamTechnicalTime}
                                    classGols={this._getClassGols("B", this.props.gameStore.game.bTeam)} />
                            </BoxWidget>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {this._renderButtons()}
                            </div>
                        </div>
                    </NavTabItem>
                    <NavTabItem active={false} tabName={'timeline'} label="Timeline">
                        <GameTimeline gameTimeline={this.props.gameStore.gameTimeline} />
                    </NavTabItem>
                    <NavTabItem active={false} tabName={'graficos'} label="Gráficos">
                    </NavTabItem>
                </NavTabs>

                <GameSettings title="Configurações da Partida" 
                    show={this.state.showSettings} 
                    edit={edit}
                    settings={game.settings}
                    onChangeSettingsField={this._updateFieldGameSettings}
                    onBack={() => this.setState({ showSettings: false })} 
                    onClose={() => this.setState({ showSettings: false })} />

                <ExecuteGame title="Execução de Partida" 
                    show={showExecuteGame}
                    game={game}
                    gameTimeline={this.props.gameStore.gameTimeline}
                    addTeamGoal={this._addTeamGoal}
                    editTeamGoal={this._editTeamGoal}
                    removeTeamGoal={this._removeTeamGoal}
                    addTeamWarning={this._addTeamWarning}
                    editTeamWarning={this._editTeamWarning}
                    removeTeamWarning={this._removeTeamWarning}
                    addTeamExclusion={this._addTeamExclusion}
                    editTeamExclusion={this._editTeamExclusion}
                    removeTeamExclusion={this._removeTeamExclusion}
                    addTeamDisqualification={this._addTeamDisqualification}
                    editTeamDisqualification={this._editTeamDisqualification}
                    removeTeamDisqualification={this._removeTeamDisqualification}
                    addTeamTechnicalTime={this._addTeamTechnicalTime}
                    editTeamTechnicalTime={this._editTeamTechnicalTime}
                    removeTeamTechnicalTime={this._removeTeamTechnicalTime}
                    saveGame={this._saveGame}
                    onClose={() => this.setState({ showExecuteGame: !showExecuteGame })} />
            </Content>
        );
    }
}