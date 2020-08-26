import React, { Component, Fragment } from 'react';
import Icon from '../../../../layout/Icon';
import './ExecuteGame.css';
import BoxWidget from '../../../../layout/BoxWidget';
import Input from '../../../../components/forms/Input';
import Select from '../../../../components/forms/Select';
import TYPE_TEAM_MEMBERS from '../../constants/type-team-members';
import MATCH_TIMES, { FIRST_TIME, SECOND_TIME, OVERTIME_ONE, OVERTIME_TWO } from '../../constants/match-times';
import { getSuitLabel } from '../../constants/suits';
import { getCategoryLabel } from '../../constants/categories';
import GameTimeline from './GameTimeline';
import Chronometer from './Chronometer';

const INITIAL_STATE = {
    minutes: 0,
    seconds: 0,
    millis: 0,
    running: false,
    gameTime: 1,
    endTime: false,
    editField: {
        time: '',
        matchTime: null,
        athlete: {},
    },
    showEditField: '',
    teamView: '',
    editIndex: -1,
    exclusions: {
        A: [],
        B: []
    }
}

export default class ExecuteGame extends Component {

    constructor(props) {
        super(props);

        //: getInitialState() method
        this.state = { ...INITIAL_STATE };

        this._handleStartClick = this._handleStartClick.bind(this);
        this._handleStopClick = this._handleStopClick.bind(this);
        this._handleResetClick = this._handleResetClick.bind(this);
        this._handleNewTime = this._handleNewTime.bind(this);
        this._saveGame = this._saveGame.bind(this);
        this._onSelectMember = this._onSelectMember.bind(this);
        this._resetFieldState = this._resetFieldState.bind(this);
        this._resetViewFieldState = this._resetViewFieldState.bind(this);
        this._renderFooterEditFieldArea = this._renderFooterEditFieldArea.bind(this);
        this._onEditTimelineItem = this._onEditTimelineItem.bind(this);
        this._onRemoveTimelineItem = this._onRemoveTimelineItem.bind(this);
    }

    componentDidMount() {
        this.setState({ ...INITIAL_STATE });
    }

    _handleStartClick(event) {
        var _this = this;
        if (!this.state.running) {
            this.interval = setInterval(() => {
                this.tick();
            }, 100)

            this.setState({running: true})
        }
    }

    _handleStopClick(event) {        
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({running: false})
        }
    }

    _handleResetClick(event) {
        this._handleStopClick();
        this.update(0, 0, 0);
    }

    _handleNewTime(event) {
        if (this._hasNextTime()) {
            this._handleResetClick();
            this.setState({ gameTime: this.state.gameTime + 1, endTime: false });
        }
    }

    _hasNextTime() {
        if (this.state.endTime) {
            const { quantityNormalTimes, quantityExtraTimes } = this.props.game.settings;
            const maxGameTimes = (quantityNormalTimes ? parseInt(quantityNormalTimes) : 0) + (quantityExtraTimes ? parseInt(quantityExtraTimes) : 0);
            if (this.state.gameTime < maxGameTimes) {
                return true;
            }
        }
        return false;
    }

    tick() {

        let millis = this.state.millis + 1;
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;

        if (millis === 10) {
            millis = 0;
            seconds = seconds + 1;
        }

        if (seconds === 60) {
            millis = 0;
            seconds = 0;
            minutes = minutes + 1;
        }

        this.update(millis, seconds, minutes);
    
        const gameSettings = this.props.game.settings;
        if (this.state.gameTime <= gameSettings.quantityNormalTimes) {
            if (minutes == gameSettings.normalTime && seconds === 0) {
                this._handleStopClick();
                this.setState({ endTime: true });
            }
        } else {
            if (minutes == gameSettings.extraTime && seconds === 0) {
                this._handleStopClick();
                this.setState({ endTime: true });
            }
        }
    }

    zeroPad(value) {
        return value < 10 ? `0${value}` : value;
    }

    update(millis, seconds, minutes) {
        this.setState({
            millis: millis,
            seconds: seconds,
            minutes: minutes,
        });
    }

    _convertGameTime() {
        switch(this.state.gameTime) {
            case 1:
                return FIRST_TIME.value;
            case 2:
                return SECOND_TIME.value;
            case 3: 
                return OVERTIME_ONE.value;
            case 4: 
                return OVERTIME_TWO.value;
            default:
                return null;
        }
    }

    _onSelectMember(e, team) {
        // const { team } = this.props;
        let memberFiltered = team.members.filter(member => member.name === e.target.value);
        memberFiltered = memberFiltered.length > 0 ? { tshirt: memberFiltered[0].tshirt || '', name: memberFiltered[0].name } : { tshirt: '', name: e.target.value };
        this.setState({ editField: {...this.state.editField, athlete: memberFiltered}});
    }

    _resetFieldState(e) {
        this.setState({ editField: { ...INITIAL_STATE.editField, athlete: {} }, showEditField: '', teamView: '', editIndex: -1 });
    }

    _resetViewFieldState(e) {
        this.setState({ showViewField: '', teamView: '', editIndex: -1 });
    }

    _onEditTimelineItem(teamTag, field, index, value) {
        this.setState({ showEditField: field, showViewField: '', teamView: teamTag, editField: value, editIndex: index });
    }

    _onRemoveTimelineItem(teamTag, field, value) {
        switch(field) {
            case 'goals':
                this.props.removeTeamGoal(teamTag, value);
                break;
            case 'warnings':
                this.props.removeTeamWarning(teamTag, value);
                break;
            case 'exclusions':
                this.props.removeTeamExclusion(teamTag, value);
                break;
            case 'disqualifications':
                this.props.removeTeamDisqualification(teamTag, value);
                break;
            case 'technicalTimes':
                this.props.removeTeamTechnicalTime(teamTag, value);
                break;
            default:
                return;
        }
    }

    _renderFooterEditFieldArea(teamTag, field) {
        const fieldValue = { matchTime: this.state.editField.matchTime, time: this.state.editField.time, athlete: this.state.editField.athlete };
        let addOperation = null;
        switch(field) {
            case 'goals':
                addOperation = this.state.editIndex >= 0 ? this.props.editTeamGoal : this.props.addTeamGoal;
                break;
            case 'warnings':
                addOperation = this.state.editIndex >= 0 ? this.props.editTeamWarging : this.props.addTeamWarning;
                break;
            case 'exclusions':
                addOperation = this.state.editIndex >= 0 ? this.props.editTeamExclusion : (tag, value) => {
                    const quantityItens = tag === 'A' ? this.props.game.aTeam[field].length : this.props.game.bTeam[field].length;
                    this.props.addTeamExclusion(tag, value);
                    if (quantityItens + 1 == this.props.game.settings.maxExclusionsToDisqualification) {
                        this.props.addTeamDisqualification(tag, value);
                    }
                    value.index = quantityItens;
                    const newExclusions = { ...this.state.exclusions };
                    newExclusions[tag].push(value);
                    this.setState({ exclusions: newExclusions });
                };
                break;
            case 'disqualifications':
                addOperation = this.state.editIndex >= 0 ? this.props.editTeamDisqualification : this.props.addTeamDisqualification;
                break;
            case 'technicalTimes':
                addOperation = this.state.editIndex >= 0 ? this.props.editTeamTechnicalTime : this.props.addTeamTechnicalTime;
                break;
            default:
                addOperation = () => {}
        }
        return (
            <div className="form-group-buttons">
                <div className="buttons-left">
                    <button type="button" className="btn btn-defailt" onClick={this._resetFieldState}>Cancelar</button>
                </div>

                <div className="buttons-right">
                    {this.state.editIndex >= 0 ? 
                    <button type="button" className="btn btn-primary" 
                        onClick={() => {
                            //Validate editField;
                            addOperation(teamTag, this.state.editField.matchTime, this.state.editIndex, fieldValue);
                            this._resetFieldState();
                            this.setState({ showViewField: field, teamView: teamTag });
                        }}>
                        <Icon type="fa" name="pen" /> Alterar
                    </button>
                    :
                    <button type="button" className="btn btn-primary" 
                        onClick={() => {
                            //Validate editField;
                            addOperation(teamTag, fieldValue);
                            this._resetFieldState();
                        }}>
                        <Icon type="fa" name="plus" /> Adicionar
                    </button>
                    }
                </div>
            </div>
        )
    }

    _renderAddItemFields(teamTag, team, field, label) {
        const action = this.state.editIndex >= 0 ? 'Alterar' : 'Adicionar';
        
        const members = field === 'goals' ? team.members.filter(member => member.type === 'athlete') : (team.members ? team.members : []);
        const classAddFieldItem = teamTag === 'A' ? 'add-field-item-ateam' : 'add-field-item-bteam';
        const classHidden = this.state.showEditField === field && this.state.teamView === teamTag ? '' : 'hidden';
        return (
            <BoxWidget id={`add-${teamTag}-${field}`} className={`${classAddFieldItem} ${classHidden}`} 
                title={`${action} ${label} para equipe ${teamTag}`} cols="12" 
                footer={this._renderFooterEditFieldArea(teamTag, field)}>
                <div className="row">
                    <Input label="Tempo" cols="12" 
                        value={this.state.editField.time}
                        onChange={e => {this.setState({ editField: { ...this.state.editField, time: e.target.value } })}} />
                    {field !== 'technicalTimes' ? 
                    <Select label="Membro" cols="12"
                        options={[{label: 'Selecione...', value: ''}].concat(members.map(member => ({ label: `${member.tshirt ? member.tshirt + ' - ' : '' }${member.name}`, value: member.name})))} 
                        value={this.state.editField.athlete.name}
                        onChange={(e) => this._onSelectMember(e, team)} />
                    : null}
                </div>
            </BoxWidget> 
        );
    }

    _renderViewItemFields(teamTag, team, field, label) {
        const classAddFieldItem = teamTag === 'A' ? 'view-field-item-ateam' : 'view-field-item-bteam';
        const classHidden = this.state.showViewField === field && this.state.teamView === teamTag ? '' : 'hidden';
        const titleView = field === 'members' ? `${label} da equipe ${teamTag}` : `Timeline de ${label} para equipe ${teamTag}`;
        return (
            <BoxWidget id={`view-${teamTag}-${field}`} className={`${classAddFieldItem} ${classHidden}`}
                title={titleView} cols="12"
                footer={(
                    <div className="form-group-buttons">
                        <div className="buttons-left">
                            <button type="button" className="btn btn-defailt" onClick={this._resetViewFieldState}>Fechar</button>
                        </div>
                    </div>
                )}>
                <div className="view-field-item-content">
                    <GameTimeline gameTimeline={this.props.gameTimeline} team={team} field={field} edit={true} onEditTimelineItem={this._onEditTimelineItem} onRemoveTimelineItem={this._onRemoveTimelineItem} /> 
                </div>
            </BoxWidget> 
        );
    }

    _getMemberType(type) {
        const typesReturneds = TYPE_TEAM_MEMBERS.filter(typeTeamMember => typeTeamMember.value === type);
        if(typesReturneds && typesReturneds.length > 0){
            return typesReturneds[0].label;
        }
        return '-';
    }

    _renderMemberViewLine(index, member, team) {
        return (
            <tr key={`member_${index}`}>
                <td>{index + 1}.</td>
                <td>{this._getMemberType(member.type)}</td>
                <td>{member.tshirt ? member.tshirt : '-'}</td>
                <td>{member.name}</td>
                <td><span className="badge bg-blue">{team.goals.filter(goal => goal.athlete && goal.athlete.name == member.name).length}</span></td>
                <td><span className="badge bg-yellow">{team.warnings.filter(warning => warning.athlete && warning.athlete.name == member.name).length}</span></td>
                <td><span className="badge bg-aqua">{team.exclusions.filter(exclusion => exclusion.athlete && exclusion.athlete.name == member.name).length}</span></td>
                <td><span className="badge bg-red">{team.disqualifications.filter(disqualification => disqualification.athlete && disqualification.athlete.name == member.name).length}</span></td>
            </tr>
        );
    }

    _renderViewMembers(teamTag, team, field) {
        const classAddFieldItem = teamTag === 'A' ? 'view-field-item-ateam' : 'view-field-item-bteam';
        const classHidden = this.state.showViewField === field && this.state.teamView === teamTag ? '' : 'hidden';
        return (
            <BoxWidget id={`view-${teamTag}-${field}`} className={`${classAddFieldItem} ${classHidden}`}
                title={`Membros da equipe ${teamTag}`} cols="12"
                footer={(
                    <div className="form-group-buttons">
                        <div className="buttons-left">
                            <button type="button" className="btn btn-defailt" onClick={this._resetViewFieldState}>Fechar</button>
                        </div>
                    </div>
                )}>
                <div className="view-field-item-content">
                    <div className="box-body no-padding table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Tipo</th>
                                    <th><Icon type="fa" name="tshirt" alt="Camisa" title="Camisa" /></th>
                                    <th>Nome</th>
                                    <th style={{width: 10}}><Icon type="fa" name="futbol" alt="Gols" title="Gols" /></th>
                                    <th style={{width: 10}}><Icon type="fa" name="tag" alt="Advertências" title="Advertências" /></th>
                                    <th style={{width: 10}}><Icon type="fa" name="clock" alt="Exclusões" title="Exclusões" /></th>
                                    <th style={{width: 10}}><Icon type="fa" name="user-slash" alt="Desqualificações" title="Desqualificações" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {team.members.map((member, index) => this._renderMemberViewLine(index, member, team))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </BoxWidget>
        );
    }

    _renderItensTeamArea(teamTag, team, field, icon, label, color) {
        return (
            <div className={`execute-game-data-other-controls-item`}>
                <div className={`execute-game-data-other-controls-item-value bg-${color}`}>
                    <span><Icon type="fa" name={icon} /></span>
                    <span>{team[field].length}</span>
                </div>
                <div className="execute-game-data-controls">
                    {field !== 'members' ? 
                    <a id={`lnk-${teamTag}-add-${field}`} href="javascript:;" title={`Adicionar ${label}`} 
                        onClick={() => {
                            if (field !== 'members') {
                                const time = `${this.zeroPad(this.state.minutes)}:${this.zeroPad(this.state.seconds)}`; 
                                this.setState({ showEditField: field, teamView: teamTag, editField: { athlete: {}, time, matchTime: this._convertGameTime() } });
                            }
                        }}>
                        <Icon type="fa" name="plus" />
                    </a>
                    : null}
                    <a id={`lnk-${teamTag}-view-${field}`} href="javascript:;" title={`Ver ${label}`}
                        onClick={() => {
                            this.setState({ showViewField: field, teamView: teamTag });
                        }}>
                        <Icon type="fa" name="eye" />
                    </a>
                </div>
                {field !== 'members' ? this._renderAddItemFields(teamTag, team, field, label) : null}
                {field !== 'members' ? this._renderViewItemFields(teamTag, team, field, label) : null}
                {field === 'members' ? this._renderViewMembers(teamTag, team, field) : null}
            </div>
        );
    }

    _renderExclusions(teamTag) {
        return this.state.exclusions[teamTag].map((exclusion, index) => this._renderItemExclusion(index, teamTag, exclusion));
    }

    _renderTeamArea(teamTag, team) {
        const classTeamArea = teamTag === 'A' ? 'execute-game-data-team-a' : 'execute-game-data-team-b';
        const classTeamColor = team.color ? `bg-${team.color}` : 'bg-blue'; 
        return (
            <div className={`${classTeamArea}`}>
                <div className="excute-game-team-id-area">
                    <div className="excute-game-team-id-area-content">
                        <h3>{team.name}</h3>
                        <span className={`execute-game-team-shield ${classTeamColor}`} >
                            <Icon type="fa" name="shield-alt" />
                        </span>
                    </div>
                    <div className="excute-game-team-id-area-exclusions">
                        <span className="label-exclusions">Exclusões</span>
                        {this._renderExclusions(teamTag)}
                    </div>
                </div>

                <div className="execute-game-data-goals">
                    <span className="value-goals">{team.goals.length}</span>
                    <div className="execute-game-data-controls">
                        <span  className={`label-goals`}><Icon type="fa" name="futbol" /> Gols</span>
                        <a href="javascript:;" title="Adicionar gol"
                            onClick={() => {
                                const time = `${this.zeroPad(this.state.minutes)}:${this.zeroPad(this.state.seconds)}`; 
                                this.setState({ showEditField: 'goals', teamView: teamTag, editField: { athlete: {}, time, matchTime: this._convertGameTime() } });
                            }}>
                           <Icon type="fa" name="plus" />
                        </a>
                        <a href="javascript:;" title="Adicionar gols"
                            onClick={() => {
                                this.setState({ showViewField: 'goals', teamView: teamTag });
                            }}>
                           <Icon type="fa" name="eye" />
                        </a>
                    </div>
                    {this._renderAddItemFields(teamTag, team, 'goals', 'Gol')}
                    {this._renderViewItemFields(teamTag, team, 'goals', 'Gol')}
                </div>

                <div className={`execute-game-data-other-controls`}>
                    {this._renderItensTeamArea(teamTag, team, 'warnings', 'tag', 'Advertência', 'yellow')}
                    {this._renderItensTeamArea(teamTag, team, 'exclusions', 'clock', 'Exclusão', 'aqua')}
                    {this._renderItensTeamArea(teamTag, team, 'disqualifications', 'user-slash', 'Desqualificação', 'red')}
                    {this._renderItensTeamArea(teamTag, team, 'technicalTimes', 'stopwatch', 'Tempo Técnico', 'gray')}
                    {this._renderItensTeamArea(teamTag, team, 'members', 'users', 'Membros', 'black')} 
                </div>

            </div>
        );
    }

    _saveGame(event) {
        this.props.saveGame();
        this.setState({ ...INITIAL_STATE });
    }

    _removeExclusionTimer(teamTag, exclusion) {
        console.log('Removendo time de exclusão:', teamTag, exclusion);
        const newExclusions = { ...this.state.exclusions };
        newExclusions[teamTag].shift();
        return newExclusions;
    }

    _renderItemExclusion(index, teamTag, exclusion) {
        const autoStopFuncion = () => this.setState({ exclusions: this._removeExclusionTimer(teamTag, exclusion) });
        return (
            <div key={`exclusion-${teamTag}-${exclusion.matchTime}-${exclusion.time}-${exclusion.index}`} className="item-exclusion">
                <div className="item-exclusion-member bg-aqua">
                    {exclusion.athlete.name ? `${exclusion.athlete.tshirt ? exclusion.athlete.tshirt + ' - ': ''}${exclusion.athlete.name}` : 'Não informado'}
                </div>
                <div className="item-exclusion-time">
                    <Icon type="fa" name="clock" />{` `}
                    <Chronometer maxTime="02:00" command={this.state.running ? 'start' : 'stop'} onAutoStop={autoStopFuncion.bind(this)} />
                </div>
            </div>
        );
    }

    render() {
        const { show, title, game, onClose } = this.props;
        return (
            <div className="execute-game-area" style={{ display: show ? 'flex' : 'none' }}>
                <div className="execute-game-close"><a href="javascript:;" onClick={() => onClose()}><Icon type="fa" name="times" /></a></div>
                <div className="execute-game-competition-bar bg-blue">
                    <div>{title || 'Execução da Partida:'}</div>
                    {game.locality ? <div><Icon type="fa" name="map-marker-alt" />{' '}{game.locality}</div> : null}
                    <div><Icon type="fa" name="calendar-alt" />{' '}{game.date}</div>
                    <div><Icon type="fa" name="clock" />{' '}{game.time}</div>
                    <div>{`${getCategoryLabel(game.category)} ${getSuitLabel(game.suit)}`}</div>
                </div>
                <div className="execute-game-data">
                    {this._renderTeamArea('A', game.aTeam)}
                    <div className="execute-game-data-info">
                        <div className="execute-game-data-info-time">
                            <div className="execute-game-data-info-cronometer">
                                <span className="label-cronometer">Tempo</span>
                                <span className="value-cronometer">
                                    {this.state.gameTime}
                                </span>
                            </div>
                            <div className="execute-game-data-info-cronometer">
                                <span className="label-cronometer">Cronômetro</span>
                                <span className="value-cronometer">
                                    <span className="mins">{this.zeroPad(this.state.minutes)}:</span> 
                                    <span className="secs">{this.zeroPad(this.state.seconds)}</span> 
                                </span>
                            </div>
                        </div>

                        <div className="execute-game-data-info-vs">
                            x
                        </div>

                        {game.tournament ? 
                        <div className="execute-game-data-info-competition">
                            <span className="label-competition">{game.tournament}</span>
                            <span className="value-competition">
                                <Icon type="fa" name="trophy" size="5" />
                            </span>
                        </div>
                        : null}

                        <div className="execute-game-data-info-control">

                            {!this.state.endTime ? <a id="lnkBackSeconds" href="javascript:;"><Icon type="fa" name="backward" /></a> : null}
                            
                            {!this.state.running && !this.state.endTime ? <a id="lnkPlayGame" href="javascript:;" onClick={this._handleStartClick}><Icon type="fa" name="play" /></a> : null}

                            {this.state.running && !this.state.endTime ? <a id="lnkStopGame" href="javascript:;" onClick={this._handleStopClick}><Icon type="fa" name="stop" /></a> : null}

                            {!this.state.running && !this.state.endTime ? <a id="lnkRestartGame" href="javascript:;" onClick={this._handleResetClick}><Icon type="fa" name="reply-all" /></a> : null}

                            {!this.state.endTime ? <a id="lnkFowardSeconds" href="javascript:;"><Icon type="fa" name="forward" /></a> : null}

                            {this._hasNextTime() ? <a id="lnkNextGameTime" href="javascript:;" onClick={this._handleNewTime}><Icon type="fa" name="step-forward" /></a> : null}

                            {this.state.endTime && !this._hasNextTime() ? <button id="btnSaveGame" type="button" className="btn btn-primary" onClick={this._saveGame}><Icon type="fa" name="check" /> Salvar</button> : null}

                        </div>
                    </div>
                    {this._renderTeamArea('B', game.bTeam)}
                </div>

            </div>
        )
    }

}