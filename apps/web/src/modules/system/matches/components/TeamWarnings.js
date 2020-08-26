import React, { Component } from 'react';
import HCModal from '../../../../components/HCModal';
import BoxWidget from '../../../../layout/BoxWidget';
import Icon from '../../../../layout/Icon';
import Input from '../../../../components/forms/Input';
import Select from '../../../../components/forms/Select';
import MATCH_TIMES, { FIRST_TIME, SECOND_TIME, OVERTIME_ONE, OVERTIME_TWO } from '../../constants/match-times';
import './TeamWarnings.css';


export default class TeamWarnings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editWarning: {},
            editting: false,
            index: null
        }

        this._onSelectAthlete = this._onSelectAthlete.bind(this);
    }

    _editWarning(index, warning) {
        this.setState({
            editWarning: warning,
            editting: 'edit',
            index
        });
    }

    _removeWarning(team, warning) {
        this.props.removeTeamWarning(team, warning);
    }

    _renderWarningseHeaderLines() {
        const { edit } = this.props;
        return (
            <thead>
                <tr>
                    <th style={{width: 10}}><Icon type="fa" name="tag" alt="Advertências" title="Advertências" /></th>
                    <th>Tempo</th>
                    <th><Icon type="fa" name="tshirt" alt="Camisa" title="Camisa" /> Membro</th>
                    {edit ? <th style={{width: 10}} colSpan="2">Ações</th> : null}
                </tr>
            </thead>
        );
    }

    _renderWarningViewLine(index, warning) {
        const { teamTag, edit } = this.props;
        return (
            <tr key={`advertencia_${warning.matchTime}_${index}`}>
                <td>{index + 1}.</td>
                <td>{`${warning.time}`}</td>
                <td>{`${warning.athlete.tshirt ? warning.athlete.tshirt + ' - ' : ''}${warning.athlete.name || ''}`}</td>
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => { this._editWarning(index, warning) }}><Icon type="fa" name="pen" alt="Editar este advertência" title="Editar este advertência" /></a></td> : null}
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => { this._removeWarning(teamTag, warning) }}><Icon type="fa" name="trash-alt" alt="Remover advertência" title="Remover advertência" /></a></td> : null}
            </tr>
        );
    }

    _renderButtonEdit() {
        
        this.setState({ 
            editWarning: {
                matchTime: '',
                time: '',
                athlete: {}
            },
            editting: 'new',
            index: null,
        });
    }

    _saveWarning() {
        const { teamTag, addTeamWarning, editTeamWarning} = this.props;
        if(this.state.editting === 'new') {
            const result = addTeamWarning(teamTag, this.state.editWarning);
            if(result) {
                this.setState({ editting: false, editWarning: {}, index: null });
            }
        } else {
            const result = editTeamWarning(teamTag, this.state.editWarning.matchTime, this.state.index, this.state.editWarning);
            if(result) {
                this.setState({ editting: false, editWarning: {}, index: null });
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
                            alt="Adicionar advertência da equipe" title="Adicionar advertência da equipe"
                            onClick={(event) => {
                                this._renderButtonEdit();
                            }}>
                            <Icon type="fa" name="plus" /> Adicionar
                        </button>
                        : <button type="button" className="btn btn-default btn-flat"
                            alt="Cancelar inclusão de advertência da equipe" title="Cancelar inclusão advertência da equipe"
                            onClick={(event) => {
                                this.setState({ editting: false, editWarning: {}, index: null });
                            }}>
                            <Icon type="fa" name="cancel" /> Cancelar
                        </button>}
                    </div>
                    
                    {this.state.editting ? <div className="buttons-right">
                        <button type="button" className="btn btn-primary btn-flat"
                            alt="Adicionar advertência da equipe" title="Adicionar advertência da equipe"
                            onClick={(event) => {
                                this._saveWarning();
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
        let memberFiltered = team.members.filter(member => member.name === e.target.value);
        memberFiltered = memberFiltered.length > 0 ? { tshirt: memberFiltered[0].tshirt, name: memberFiltered[0].name } : { tshirt: e.target.value, name: '' };
        this.setState({ editWarning: {...this.state.editWarning, athlete: memberFiltered}});
    }

    _renderWarnings(team, matchTime) {
        return team.warnings.filter(warning => warning.matchTime === matchTime)
        .sort((warning, other) => warning.time > other.time)
        .map((warning, index) => this._renderWarningViewLine(index, warning))
    }

    _renderBoxGameTime(matchTime, team) {
        return (
            <BoxWidget title={matchTime.label} cols="12 12 6" collapse={true}>
                <div className="box-body no-padding">
                    <table className="table table-striped">
                    {this._renderWarningseHeaderLines()}
                        <tbody>
                            {this._renderWarnings(team, matchTime.value)}
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
                <BoxWidget title={"Adicionar Advertência"} cols="12">
                    <div className="row">
                        <Select label="Fase da partida" cols="12"
                            options={MATCH_TIMES} 
                            value={this.state.editWarning.matchTime} 
                            disabled={this.state.editting === 'edit'}
                            onChange={e => {this.setState({ editWarning: {...this.state.editWarning, matchTime: e.target.value}})}} />
                        <Input label="Tempo" cols="12" 
                            value={this.state.editWarning.time}
                            onChange={e => {this.setState({ editWarning: {...this.state.editWarning, time: e.target.value}})}} />
                        <Select label="Atleta" cols="12"
                            options={[{label: 'Selecione...', value: ''}].concat(team.members.map(member => ({ label: `${member.tshirt ? member.tshirt + ' - ' : '' }${member.name}`, value: member.name})))} 
                            value={this.state.editWarning.tshirt}
                            onChange={this._onSelectAthlete} />
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
