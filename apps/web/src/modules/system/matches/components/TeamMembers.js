import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import HCModal from '../../../../components/HCModal';
import Icon from '../../../../layout/Icon';
import Input from '../../../../components/forms/Input';
import Select from '../../../../components/forms/Select';
import DatePicker from '../../../../components/forms/DatePicker';
import TYPE_TEAM_MEMBERS from '../../constants/type-team-members';
import './TeamMembers.css';


@inject("gameStore")
@observer
export default class TeamMembers extends Component {

    _getMemberType(type) {
        const typesReturneds = TYPE_TEAM_MEMBERS.filter(typeTeamMember => typeTeamMember.value === type);
        if(typesReturneds && typesReturneds.length > 0){
            return typesReturneds[0].label;
        }
        return '-';
    }

    _renderMemberEditLine(index, member) {
        const { teamTag, removeTeamMember, changeFieldValueMember, edit, team} = this.props;
        return (
            <tr key={`member_${index}`}>
                <td>{index + 1}.</td>
                <td><Select options={TYPE_TEAM_MEMBERS} value={member.type} size="small" onChange={e => changeFieldValueMember(teamTag, index, 'type', e.target.value)} /></td>
                <td>{member.type === 'athlete' ? <Input type="number" value={member.tshirt} size="small" placeholder="Camisa" onChange={e => changeFieldValueMember(teamTag, index, 'tshirt', e.target.value)} /> : '-' } </td>
                <td><Input value={member.name} size="small" placeholder="Nome" onChange={e => changeFieldValueMember(teamTag, index, 'name', e.target.value)} /></td>
                <td><DatePicker value={member.birthDate} size="small" placeholder="Data de Nascimento" onChange={e => changeFieldValueMember(teamTag, index, 'birthDate', e.target.value)} /></td>
                <td>{member.type === 'athlete' ? <span className="badge bg-blue">{team.goals.filter(goal => goal.athlete && goal.athlete.tshirt == member.tshirt).length}</span> : '-'}</td>
                <td><span className="badge bg-yellow">{team.warnings.filter(warning => warning.athlete && warning.athlete.name == member.name).length}</span></td>
                <td><span className="badge bg-aqua">{team.exclusions.filter(exclusion => exclusion.athlete && exclusion.athlete.name == member.name).length}</span></td>
                <td><span className="badge bg-red">{team.disqualifications.filter(disqualification => disqualification.athlete && disqualification.athlete.name == member.name).length}</span></td>
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => changeFieldValueMember(teamTag, index, 'edit', false)}><Icon type="fa" name="check" alt="Confirmar alteração" title="Confirmar alteração" /></a></td> : null }
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => removeTeamMember(teamTag, member)}><Icon type="fa" name="trash-alt" alt="Remover membro" title="Remover membro" /></a></td> : null }
            </tr>
        );
    }

    _renderMemberViewLine(index, member) {
        const { teamTag, removeTeamMember, changeFieldValueMember, edit, team} = this.props;
        return (
            <tr key={`member_${index}`}>
                <td>{index + 1}.</td>
                <td>{this._getMemberType(member.type)}</td>
                <td>{member.tshirt ? member.tshirt : '-'}</td>
                <td>{member.name}</td>
                <td>{member.birthDate}</td>
                <td><span className="badge bg-blue">{team.goals.filter(goal => goal.athlete && goal.athlete.tshirt == member.tshirt).length}</span></td>
                <td><span className="badge bg-yellow">{team.warnings.filter(warning => warning.athlete && warning.athlete.name == member.name).length}</span></td>
                <td><span className="badge bg-aqua">{team.disqualifications.filter(disqualification => disqualification.athlete && disqualification.athlete.name == member.name).length}</span></td>
                <td><span className="badge bg-red">0</span></td>
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => changeFieldValueMember(teamTag, index, 'edit', true)}><Icon type="fa" name="pen" alt="Editar este membro" title="Editar este membro" /></a></td> : null}
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => removeTeamMember(teamTag, member)}><Icon type="fa" name="trash-alt" alt="Remover membro" title="Remover membro" /></a></td> : null}
            </tr>
        );
    }

    _renderLines(teamTag) {
        const editForm = this.props.edit;
        let team = null;
        if(teamTag === 'A'){
            team = this.props.gameStore.game.aTeam;
        } else if(teamTag === 'B') {
            team = this.props.gameStore.game.bTeam;
        }

        return team.members.map((member, index) => {
            if (editForm && member.edit) {
                return this._renderMemberEditLine(index, member);
            } 
            return this._renderMemberViewLine(index, member);
        });
    }

    _renderButtons() {

        const { teamTag, addTeamMember, edit} = this.props;

        if (edit) {
            return (
                <div className="form-group-buttons">
                    <div className="buttons-right">
                        <button type="button" className="btn btn-default btn-flat"
                            alt="Adicionar membros da equipe" title="Adicionar membros da equipe"
                            onClick={(event) => addTeamMember(teamTag)}>
                            <Icon type="fa" name="user-plus" /> Adicionar
                        </button>
                    </div>
                    <div className="buttons-left">
                        {/* <button type="button" className="btn btn-primary btn-flat"
                            alt="Adicionar membros da equipe" title="Salvar">
                            <Icon type="fa" name="check" /> Salvar
                        </button> */}
                    </div>
                </div>
            );
        }
        return null;
    }

    render() {
        const { title, show, teamTag, edit, onBack, onClose } = this.props;

        return (
            <HCModal title={title} show={show} onBack={onBack} onClose={onClose} footerComponent={this._renderButtons()}>
                
                <div className="box ">
                    {/* <!-- /.box-header --> */}
                    <div className="box-body no-padding table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Tipo</th>
                                    <th><Icon type="fa" name="tshirt" alt="Camisa" title="Camisa" /></th>
                                    <th>Nome</th>
                                    <th>Data de Nascimento</th>
                                    <th style={{width: 10}}><Icon type="fa" name="futbol" alt="Gols" title="Gols" /></th>
                                    <th style={{width: 10}}><Icon type="fa" name="tag" alt="Advertências" title="Advertências" /></th>
                                    <th style={{width: 10}}><Icon type="fa" name="clock" alt="Exclusões" title="Exclusões" /></th>
                                    <th style={{width: 10}}><Icon type="fa" name="user-slash" alt="Desqualificações" title="Desqualificações" /></th>
                                    {edit ? <th style={{width: 10}} colSpan="2">Ações</th> : null }
                                </tr>
                            </thead>
                            <tbody>
                                {this._renderLines(teamTag)}
                            </tbody>
                        </table>
                    </div>
                    {/* <!-- /.box-body --> */}
                </div>
            </HCModal>
        )
    }

}