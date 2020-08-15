import React, { Component } from 'react';
import HCModal from '../../../../components/HCModal';
import BoxWidget from '../../../../layout/BoxWidget';
import Icon from '../../../../layout/Icon';
import Input from '../../../../components/forms/Input';
import Select from '../../../../components/forms/Select';
import MATCH_TIMES, { FIRST_TIME, SECOND_TIME, OVERTIME_ONE, OVERTIME_TWO } from '../../constants/match-times';
import './TeamGoals.css';


export default class TeamGoals extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editGoal: {},
            editting: false,
            index: null
        }

        this._onSelectAthlete = this._onSelectAthlete.bind(this);
    }

    _editGoal(index, goal) {
        this.setState({
            editGoal: goal,
            editting: 'edit',
            index
        });
    }

    _removeGoal(team, goal) {
        this.props.removeTeamGoal(team, goal);
    }

    _renderGolseHeaderLines() {
        const { edit } = this.props;
        return (
            <thead>
                <tr>
                    <th style={{width: 10}}><Icon type="fa" name="futbol" alt="Gols" title="Gols" /></th>
                    <th>Tempo</th>
                    <th><Icon type="fa" name="tshirt" alt="Camisa" title="Camisa" /> Atleta</th>
                    {edit ? <th style={{width: 10}} colSpan="2">Ações</th> : null}
                </tr>
            </thead>
        );
    }

    _renderGoalViewLine(index, goal) {
        const { teamTag, edit } = this.props;
        return (
            <tr key={`gols_${goal.matchTime}_${index}`}>
                <td>{index + 1}.</td>
                <td>{`${goal.time}`}</td>
                <td>{`${goal.athlete.tshirt || ''} - ${goal.athlete.name || ''}`}</td>
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => { this._editGoal(index, goal) }}><Icon type="fa" name="pen" alt="Editar este gol" title="Editar este gol" /></a></td> : null}
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => { this._removeGoal(teamTag, goal) }}><Icon type="fa" name="trash-alt" alt="Remover gol" title="Remover gol" /></a></td> : null}
            </tr>
        );
    }

    _renderButtonEdit() {
        
        this.setState({ 
            editGoal: {
                matchTime: '',
                time: '',
                athlete: {}
            },
            editting: 'new',
            index: null,
        });
    }

    _saveGoal() {
        const { teamTag, addTeamGoal, editTeamGoal} = this.props;
        if(this.state.editting === 'new') {
            const result = addTeamGoal(teamTag, this.state.editGoal);
            if(result) {
                this.setState({ editting: false, editGoal: {}, index: null });
            }
        } else {
            const result = editTeamGoal(teamTag, this.state.editGoal.matchTime, this.state.index, this.state.editGoal);
            if(result) {
                this.setState({ editting: false, editGoal: {}, index: null });
            }
        }
    }

    _renderButtons() {

        const { edit} = this.props;

        if (edit) {
            return (
                <div className="form-group-buttons">
                    <div className="buttons-left">
                        {!this.state.editting ? 
                        <button type="button" className="btn btn-default btn-flat"
                            alt="Adicionar gol da equipe" title="Adicionar gol da equipe"
                            onClick={(event) => {
                                this._renderButtonEdit();
                            }}>
                            <Icon type="fa" name="plus" /> Adicionar
                        </button>
                        : <button type="button" className="btn btn-default btn-flat"
                            alt="Cancelar inclusão de gol da equipe" title="Cancelar inclusão gol da equipe"
                            onClick={(event) => {
                                this.setState({ editting: false, editGoal: {}, index: null });
                            }}>
                            <Icon type="fa" name="cancel" /> Cancelar
                        </button>}
                    </div>
                    
                    {this.state.editting ? <div className="buttons-right">
                        <button type="button" className="btn btn-primary btn-flat"
                            alt="Adicionar gol da equipe" title="Adicionar gol da equipe"
                            onClick={(event) => {
                                this._saveGoal();
                            }}>
                            <Icon type="fa" name="check" /> Confirmar
                        </button>
                    </div> : null}
                </div>
            );
        }
        return null;
    }

    _onSelectAthlete(e) {
        const { team } = this.props;
        let memberFiltered = team.members.filter(member => member.tshirt === e.target.value);
        memberFiltered = memberFiltered.length > 0 ? { tshirt: memberFiltered[0].tshirt, name: memberFiltered[0].name } : { tshirt: e.target.value, name: '' };
        this.setState({ editGoal: {...this.state.editGoal, athlete: memberFiltered}});
    }

    _renderGols(team, matchTime) {
        return team.goals.filter(goal => goal.matchTime === matchTime)
        .sort((goal, other) => goal.time > other.time)
        .map((goal, index) => this._renderGoalViewLine(index, goal))
    }

    render() {
        const { title, show, team, edit, onBack, onClose } = this.props;

        return (
            <HCModal title={title} show={show} onBack={onBack} onClose={onClose} footerComponent={this._renderButtons()}>

                {edit && this.state.editting ? 
                <BoxWidget title={"Adicionar Gol"} cols="12">
                    <div className="row">
                        <Select label="Fase da partida" cols="12"
                            options={MATCH_TIMES} 
                            value={this.state.editGoal.matchTime} 
                            disabled={this.state.editting === 'edit'}
                            onChange={e => {this.setState({ editGoal: {...this.state.editGoal, matchTime: e.target.value}})}} />
                        <Input label="Tempo" cols="12" 
                            value={this.state.editGoal.time}
                            onChange={e => {this.setState({ editGoal: {...this.state.editGoal, time: e.target.value}})}} />
                        <Select label="Atleta" cols="12"
                            options={[{label: 'Selecione...', value: ''}].concat(team.members.filter(member => member.type === 'athlete').map(member => ({ label: `${member.tshirt} - ${member.name}`, value: member.tshirt})))} 
                            value={this.state.editGoal.tshirt}
                            onChange={this._onSelectAthlete} />
                    </div>
                </BoxWidget> 
                : null }
                

                {!this.state.editting ? <div>
                    <BoxWidget title={FIRST_TIME.label} cols="12 12 6" collapse={true}>
                        <div className="box-body no-padding">
                            <table className="table table-striped">
                            {this._renderGolseHeaderLines()}
                                <tbody>
                                    {this._renderGols(team, FIRST_TIME.value)}
                                </tbody>
                            </table>
                        </div>
                    </BoxWidget>

                    <BoxWidget title={SECOND_TIME.label} cols="12 12 6" collapse={true}>
                        <div className="box-body no-padding">
                            <table className="table table-striped">
                                {this._renderGolseHeaderLines()}
                                <tbody>
                                    {this._renderGols(team, SECOND_TIME.value)}
                                </tbody>
                            </table>
                        </div>
                    </BoxWidget>

                    <BoxWidget title={OVERTIME_ONE.label} cols="12 12 6" collapse={true}>
                        <div className="box-body no-padding">
                            <table className="table table-striped">
                                {this._renderGolseHeaderLines()}
                                <tbody>
                                    {this._renderGols(team, OVERTIME_ONE.value)}
                                </tbody>
                            </table>
                        </div>
                    </BoxWidget>

                    <BoxWidget title={OVERTIME_TWO.label} cols="12 12 6" collapse={true}>
                        <div className="box-body no-padding">
                            <table className="table table-striped">
                                {this._renderGolseHeaderLines()}
                                <tbody>
                                    {this._renderGols(team, OVERTIME_TWO.value)}
                                </tbody>
                            </table>
                        </div>
                    </BoxWidget>
                </div> : null}
               
            </HCModal>
        )
    }

}
