import React, { Component } from 'react';
import HCModal from '../../../../components/HCModal';
import BoxWidget from '../../../../layout/BoxWidget';
import Icon from '../../../../layout/Icon';
import Input from '../../../../components/forms/Input';
import Select from '../../../../components/forms/Select';
import MATCH_TIMES, { FIRST_TIME, SECOND_TIME, OVERTIME_ONE, OVERTIME_TWO } from '../../constants/match-times';
import './TeamExclusions.css';


export default class TeamExclusions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editExclusions: {},
            editting: false,
            index: null
        }

        this._onSelectAthlete = this._onSelectAthlete.bind(this);
    }

    _editExclusions(index, exclusion) {
        this.setState({
            editExclusions: exclusion,
            editting: 'edit',
            index
        });
    }

    _removeExclusion(team, exclusion) {
        this.props.removeTeamExclusion(team, exclusion);
    }

    _renderExclusionsHeaderLines() {
        const { edit } = this.props;
        return (
            <thead>
                <tr>
                    <th style={{width: 10}}><Icon type="fa" name="tag" alt="Exclusões" title="Exclusões" /></th>
                    <th>Tempo</th>
                    <th><Icon type="fa" name="tshirt" alt="Camisa" title="Camisa" /> Membro</th>
                    {edit ? <th style={{width: 10}} colSpan="2">Ações</th> : null}
                </tr>
            </thead>
        );
    }

    _renderExclusionViewLine(index, exclusion) {
        const { teamTag, edit } = this.props;
        return (
            <tr key={`advertencia_${exclusion.matchTime}_${index}`}>
                <td>{index + 1}.</td>
                <td>{`${exclusion.time}`}</td>
                <td>{`${exclusion.athlete.tshirt ? exclusion.athlete.tshirt + ' - ' : ''}${exclusion.athlete.name || ''}`}</td>
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => { this._editExclusions(index, exclusion) }}><Icon type="fa" name="pen" alt="Editar este exclusão" title="Editar este exclusão" /></a></td> : null}
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => { this._removeExclusion(teamTag, exclusion) }}><Icon type="fa" name="trash-alt" alt="Remover exclusão" title="Remover exclusão" /></a></td> : null}
            </tr>
        );
    }

    _renderButtonEdit() {
        
        this.setState({ 
            editExclusions: {
                matchTime: '',
                time: '',
                athlete: {}
            },
            editting: 'new',
            index: null,
        });
    }

    _saveExclusion() {
        const { teamTag, addTeamExclusion, editTeamExclusion} = this.props;
        if(this.state.editting === 'new') {
            const result = addTeamExclusion(teamTag, this.state.editExclusions);
            if(result) {
                this.setState({ editting: false, editExclusions: {}, index: null });
            }
        } else {
            const result = editTeamExclusion(teamTag, this.state.editExclusions.matchTime, this.state.index, this.state.editExclusions);
            if(result) {
                this.setState({ editting: false, editExclusions: {}, index: null });
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
                            alt="Adicionar exclusão da equipe" title="Adicionar exclusão da equipe"
                            onClick={(event) => {
                                this._renderButtonEdit();
                            }}>
                            <Icon type="fa" name="plus" /> Adicionar
                        </button>
                        : <button type="button" className="btn btn-default btn-flat"
                            alt="Cancelar inclusão de exclusão da equipe" title="Cancelar inclusão exclusão da equipe"
                            onClick={(event) => {
                                this.setState({ editting: false, editExclusions: {}, index: null });
                            }}>
                            <Icon type="fa" name="cancel" /> Cancelar
                        </button>}
                    </div>
                    
                    {this.state.editting ? <div className="buttons-right">
                        <button type="button" className="btn btn-primary btn-flat"
                            alt="Adicionar exclusão da equipe" title="Adicionar exclusão da equipe"
                            onClick={(event) => {
                                this._saveExclusion();
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
        this.setState({ editExclusions: {...this.state.editExclusions, athlete: memberFiltered}});
    }

    _renderExclusions(team, matchTime) {
        return team.exclusions.filter(exclusion => exclusion.matchTime === matchTime)
        .sort((exclusion, other) => exclusion.time > other.time)
        .map((exclusion, index) => this._renderExclusionViewLine(index, exclusion))
    }

    _renderBoxGameTime(matchTime, team) {
        return (
            <BoxWidget title={matchTime.label} cols="12 12 6" collapse={true}>
                <div className="box-body no-padding">
                    <table className="table table-striped">
                    {this._renderExclusionsHeaderLines()}
                        <tbody>
                            {this._renderExclusions(team, matchTime.value)}
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
                <BoxWidget title={"Adicionar Exclusão"} cols="12">
                    <div className="row">
                        <Select label="Fase da partida" cols="12"
                            options={MATCH_TIMES} 
                            value={this.state.editExclusions.matchTime} 
                            disabled={this.state.editting === 'edit'}
                            onChange={e => {this.setState({ editExclusions: {...this.state.editExclusions, matchTime: e.target.value}})}} />
                        <Input label="Tempo" cols="12" 
                            value={this.state.editExclusions.time}
                            onChange={e => {this.setState({ editExclusions: {...this.state.editExclusions, time: e.target.value}})}} />
                        <Select label="Atleta" cols="12"
                            options={[{label: 'Selecione...', value: ''}].concat(team.members.map(member => ({ label: `${member.tshirt ? member.tshirt + ' - ' : '' }${member.name}`, value: member.name})))} 
                            value={this.state.editExclusions.tshirt}
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
