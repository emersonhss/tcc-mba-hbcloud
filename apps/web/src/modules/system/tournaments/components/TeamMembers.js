import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import HCModal from '../../../../components/HCModal';
import Icon from '../../../../layout/Icon';
import Input from '../../../../components/forms/Input';
import Select from '../../../../components/forms/Select';
import DatePicker from '../../../../components/forms/DatePicker';
import TYPE_TEAM_MEMBERS from '../../constants/type-team-members';
import './TeamMembers.css';


@inject("tournamentStore")
@inject("tournamentRegistrationStore")
@observer
export default class TeamMembers extends Component {

    constructor(props) {
        super(props);

        this._changeMemberTeamField = this._changeMemberTeamField.bind(this);    
        this._removeMemberTeam = this._removeMemberTeam.bind(this);
        this._addNewMemberTeam = this._addNewMemberTeam.bind(this);
    }

    _changeMemberTeamField(team, index, field, value) {
        const { association } = this.props;
        if(association) {
            this.props.tournamentStore.changeFieldMemberTeam(association._id, team, index, field, value);
        } else {
            this.props.tournamentRegistrationStore.changeFieldMemberTeam(team, index, field, value);
        }
    }

    _removeMemberTeam(team, index) {
        const { association } = this.props;
        if(association) {
            this.props.tournamentStore.removeMemberTeam(association._id, team, index);
        } else {
            this.props.tournamentRegistrationStore.removeMemberTeam(team, index);
        }
    }

    _addNewMemberTeam(team) {
        const { association } = this.props;
        if(association) {
            this.props.tournamentStore.addNewMemberTeam(association._id, team);
        } else {
            this.props.tournamentRegistrationStore.addNewMemberTeam(team);
        }
    }

    _getMemberType(type) {
        const typesReturneds = TYPE_TEAM_MEMBERS.filter(typeTeamMember => typeTeamMember.value === type);
        if(typesReturneds && typesReturneds.length > 0){
            return typesReturneds[0].label;
        }
        return '-';
    }

    _renderMemberEditLine(index, member) {
        const { association, edit, team} = this.props;
        const observableTeam = this._getObservableTeam(team);
        return (
            <tr key={`member_${index}`}>
                <td>{index + 1}.</td>
                <td><Select options={TYPE_TEAM_MEMBERS} value={member.type} size="small" onChange={e => this._changeMemberTeamField(observableTeam, index, 'type', e.target.value)} /></td>
                <td>{member.type === 'athlete' ? <Input type="number" value={member.tshirt} size="small" placeholder="Camisa" onChange={e => this._changeMemberTeamField(observableTeam, index, 'tshirt', e.target.value)} /> : '-' } </td>
                <td><Input value={member.name} size="small" placeholder="Nome" onChange={e => this._changeMemberTeamField(observableTeam, index, 'name', e.target.value)} /></td>
                <td><DatePicker value={member.birthDate} size="small" placeholder="Data de Nascimento" onChange={e => this._changeMemberTeamField(observableTeam, index, 'birthDate', e.target.value)} /></td>
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => this._changeMemberTeamField(observableTeam, index, 'edit', false)}><Icon type="fa" name="check" alt="Confirmar alteração" title="Confirmar alteração" /></a></td> : null }
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => this._removeMemberTeam(observableTeam, index)}><Icon type="fa" name="trash-alt" alt="Remover membro" title="Remover membro" /></a></td> : null }
            </tr>
        );
    }

    _renderMemberViewLine(index, member) {
        const { association, edit, team} = this.props;
        const observableTeam = this._getObservableTeam(team);
        return (
            <tr key={`member_${index}`}>
                <td>{index + 1}.</td>
                <td>{this._getMemberType(member.type)}</td>
                <td>{member.tshirt ? member.tshirt : '-'}</td>
                <td>{member.name}</td>
                <td>{member.birthDate}</td>
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => this._changeMemberTeamField(observableTeam, index, 'edit', true)}><Icon type="fa" name="pen" alt="Editar este membro" title="Editar este membro" /></a></td> : null}
                {edit ? <td style={{width: 10}}><a role="button" onClick={e => this._removeMemberTeam(observableTeam, index)}><Icon type="fa" name="trash-alt" alt="Remover membro" title="Remover membro" /></a></td> : null}
            </tr>
        );
    }

    _renderLines(team) {
        const editForm = this.props.edit;
        return team.members ? team.members.map((member, index) => {
            if (editForm && member.edit) {
                return this._renderMemberEditLine(index, member);
            } 
            return this._renderMemberViewLine(index, member);
        }) : null;
    }

    _renderButtons(observableTeam) {

        const { edit } = this.props;

        if (edit) {
            return (
                <div className="form-group-buttons">
                    <div className="buttons-right">
                        <button type="button" className="btn btn-default btn-flat"
                            alt="Adicionar membros da equipe" title="Adicionar membros da equipe"
                            onClick={(event) => this._addNewMemberTeam(observableTeam)}>
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

    _getObservableTeam(team) {
        const { association } = this.props;
        if (association) {
            const { tournament } = this.props.tournamentStore;
            const associationIndex = tournament.associations.findIndex(association => team.association ? association._id === team.association._id : false);
            if (associationIndex >= 0) {
                console.log('AssociationIndex:', associationIndex, tournament.associations[associationIndex])
                const filteredTeams = tournament.associations[associationIndex].teams.filter(assocTeam => assocTeam.name === team.name);
                if(filteredTeams && filteredTeams.length > 0) {
                    return filteredTeams[0];
                }
            }
        } else {
            const { associationTeams } = this.props.tournamentRegistrationStore;
            const filteredTeams = associationTeams.filter(assocTeam => assocTeam.name === team.name && assocTeam.category === team.category);
            if(filteredTeams && filteredTeams.length > 0) {
                return filteredTeams[0];
            }
        }
        return {};
    }

    render() {
        console.log('Render TeamMembers');
        const { title, show, team, edit, onBack, onClose } = this.props;
        const observableTeam = this._getObservableTeam(team);

        return (
            <HCModal title={title} show={show} onBack={onBack} onClose={onClose} footerComponent={this._renderButtons(observableTeam)}>
                
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
                                    {edit ? <th style={{width: 10}} colSpan="2">Ações</th> : null }
                                </tr>
                            </thead>
                            <tbody>
                                {this._renderLines(observableTeam)}
                            </tbody>
                        </table>
                    </div>
                    {/* <!-- /.box-body --> */}
                </div>
            </HCModal>
        )
    }

}