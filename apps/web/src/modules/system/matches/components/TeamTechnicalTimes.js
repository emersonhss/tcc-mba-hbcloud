import React, { Component } from 'react';
import HCModal from '../../../../components/HCModal';
import BoxWidget from '../../../../layout/BoxWidget';
import Icon from '../../../../layout/Icon';
import Input from '../../../../components/forms/Input';
import Select from '../../../../components/forms/Select';
import MATCH_TIMES, { FIRST_TIME, SECOND_TIME, OVERTIME_ONE, OVERTIME_TWO } from '../../constants/match-times';
import './TeamTechnicalTimes.css';


export default class TeamTechnicalTimes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editTechnicalTime: {},
            editting: false,
            index: null
        }
    }

    _ediTechnicalTime(index, technicalTime) {
        this.setState({
            editTechnicalTime: technicalTime,
            editting: 'edit',
            index
        });
    }

    _removeTechnicalTime(team, technicalTime) {
        this.props.removeTeamTechnicalTime(team, technicalTime);
    }

    _renderTechnicalTimesHeaderLines() {
        const { edit } = this.props;
        return (
            <thead>
                <tr>
                    <th style={{width: 10}}><Icon type="fa" name="tag" alt="Tempo Técnico" title="Tempo Técnico" /></th>
                    <th>Tempo</th>
                    {edit ? <th style={{width: 10}} colSpan="2">Ações</th> : null}
                </tr>
            </thead>
        );
    }

    _renderTechnicalTimeViewLine(index, technicalTime) {
        const { teamTag, edit } = this.props;
        return (
            <tr key={`tempoTecnico_${technicalTime.matchTime}_${index}`}>
                <td>{index + 1}.</td>
                <td>{`${technicalTime.time}`}</td>
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => { this._ediTechnicalTime(index, technicalTime) }}><Icon type="fa" name="pen" alt="Editar este tempo técnico" title="Editar este tempo técnico" /></a></td> : null}
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => { this._removeTechnicalTime(teamTag, technicalTime) }}><Icon type="fa" name="trash-alt" alt="Remover tempo técnico" title="Remover tempo técnico" /></a></td> : null}
            </tr>
        );
    }

    _renderButtonEdit() {
        
        this.setState({ 
            editTechnicalTime: {
                matchTime: '',
                time: '',
                athlete: {}
            },
            editting: 'new',
            index: null,
        });
    }

    _saveTechnicalTime() {
        const { teamTag, addTeamTechnicalTime, editTeamTechnicalTime} = this.props;
        if(this.state.editting === 'new') {
            const result = addTeamTechnicalTime(teamTag, this.state.editTechnicalTime);
            if(result) {
                this.setState({ editting: false, editTechnicalTime: {}, index: null });
            }
        } else {
            const result = editTeamTechnicalTime(teamTag, this.state.editTechnicalTime.matchTime, this.state.index, this.state.editTechnicalTime);
            if(result) {
                this.setState({ editting: false, editTechnicalTime: {}, index: null });
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
                            alt="Adicionar tempo técnico da equipe" title="Adicionar tempo técnico da equipe"
                            onClick={(event) => {
                                this._renderButtonEdit();
                            }}>
                            <Icon type="fa" name="plus" /> Adicionar
                        </button>
                        : <button type="button" className="btn btn-default btn-flat"
                            alt="Cancelar inclusão de tempo técnico da equipe" title="Cancelar inclusão tempo técnico da equipe"
                            onClick={(event) => {
                                this.setState({ editting: false, editTechnicalTime: {}, index: null });
                            }}>
                            <Icon type="fa" name="cancel" /> Cancelar
                        </button>}
                    </div>
                    
                    {this.state.editting ? <div className="buttons-right">
                        <button type="button" className="btn btn-primary btn-flat"
                            alt="Adicionar tempo técnico da equipe" title="Adicionar tempo técnico da equipe"
                            onClick={(event) => {
                                this._saveTechnicalTime();
                            }}>
                            <Icon type="fa" name="check" /> Confirmar
                        </button>
                    </div> : null}
                </div>
            );
        }
        return null;
    }

    _renderTechnicalTimes(team, matchTime) {
        return team.technicalTimes.filter(technicalTime => technicalTime.matchTime === matchTime)
        .sort((technicalTime, other) => technicalTime.time > other.time)
        .map((technicalTime, index) => this._renderTechnicalTimeViewLine(index, technicalTime))
    }

    _renderBoxGameTime(matchTime, team) {
        return (
            <BoxWidget title={matchTime.label} cols="12 12 6" collapse={true}>
                <div className="box-body no-padding">
                    <table className="table table-striped">
                    {this._renderTechnicalTimesHeaderLines()}
                        <tbody>
                            {this._renderTechnicalTimes(team, matchTime.value)}
                        </tbody>
                    </table>
                </div>
            </BoxWidget>
        );
    }

    render() {
        const { title, show, team, edit, onBack, onClose } = this.props;

        return (
            <HCModal title={title} show={show} onBack={onBack} onClose={onClose} footerComponent={this._renderButtons()}>

                {edit && this.state.editting ? 
                <BoxWidget title={"Adicionar tempo técnico"} cols="12">
                    <div className="row">
                        <Select label="Fase da partida" cols="12"
                            options={MATCH_TIMES} 
                            value={this.state.editTechnicalTime.matchTime} 
                            disabled={this.state.editting === 'edit'}
                            onChange={e => {this.setState({ editTechnicalTime: {...this.state.editTechnicalTime, matchTime: e.target.value}})}} />
                        <Input label="Tempo" cols="12" 
                            value={this.state.editTechnicalTime.time}
                            onChange={e => {this.setState({ editTechnicalTime: {...this.state.editTechnicalTime, time: e.target.value}})}} />
                    </div>
                </BoxWidget> 
                : null }
                
                {!this.state.editting ? 
                <div>
                    {this._renderBoxGameTime(FIRST_TIME, team)}
                    {this._renderBoxGameTime(SECOND_TIME, team)}
                    {this._renderBoxGameTime(OVERTIME_ONE, team)}
                    {this._renderBoxGameTime(OVERTIME_TWO, team)}
                </div>
                 : null}
               
            </HCModal>
        )
    }

}
