import React, { Component } from 'react'
import { inject } from 'mobx-react';
import BoxWidget from '../../../../layout/BoxWidget';
import Icon from '../../../../layout/Icon';
import Select from '../../../../components/forms/Select';
import { getCategoryLabel } from '../../constants/categories';
import { getSuitLabel } from '../../constants/suits';
import TOURNAMENT_ASSOCIATION_REGISTRATION_STATUS from '../../constants/tournament-registration-association-status';
import './RegistrationsTabForm.css';
import TeamMembers from './TeamMembers';

const statusOptions = [{ label: 'Selecione a situação...', value: ''}].concat(TOURNAMENT_ASSOCIATION_REGISTRATION_STATUS);

@inject("routerStore")
@inject("tournamentStore")
export default class RegistrationsTabForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryFilter: '',
            statusRegistrationFilter: '',
            modalMembersTitle: '',
            modalMembersShow: false,
            modalMembersTeam: {},
            modalMembersAssociation: {}
        };

        this._showModalTeamMembers = this._showModalTeamMembers.bind(this);
        this._hideModalTeamMembers = this._hideModalTeamMembers.bind(this);
    }
    
    _getCategoryLabel(category) {
        if(!category) {
            return '';
        }
        const categorySplited = category.split('_');
        return `${getCategoryLabel(categorySplited[0])} ${getSuitLabel(categorySplited[1])}`;
    }
    
    _renderAssociations() {
        const { tournament, edit } = this.props.tournamentStore;
        const associations = tournament.associations;
        associations.sort((a, b) => {
            return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
        });
        return associations.map((association, index) => (
            <li className="item" key={`association_${association._id}`}>
                <div className="product-img">
                    <Icon type="fa" name="shield-alt"color={association.color} size="3" />
                </div>
                <div className="product-info">
                    <a href="javascript:void(0)" className="product-title">{association.name}
                    <span className="label label-primary pull-right">{association.teams.length === 1 ? `${association.teams.length} equipe` : `${association.teams.length} equipes`}</span></a>
                    <span className="product-description">
                        <Icon type="fa" name="map-marker-alt" /> {association.locality}
                        <div className="row">
                            <Select options={statusOptions} value={association.status} size="small" disabled={!edit}
                                onChange={e => this.props.tournamentStore.updateAssociationField(association._id, 'status', e.target.value)} />
                        </div>
                    </span>
                </div>
            </li>
        ));
    }

    _renderAssociationsTeams() {
        const { tournament, edit } = this.props.tournamentStore;
        
        const associationTeams = tournament.associations.reduce((teams, association) => {
            return teams.concat(association.teams.map(team => {
                team.image = team.image || association.image;
                team.color = team.color || association.color;
                team.locality = team.locality || association.locality;
                return team;
            }));
        }, []);

        associationTeams.sort((a, b) => {
            return a.category > b.category ? 1 : (a.category < b.category ? -1 : (a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)));
        });

        return associationTeams
            .filter(team => this.state.categoryFilter ? team.category === this.state.categoryFilter : true)
            .filter(team => this.state.statusRegistrationFilter ? team.status === this.state.statusRegistrationFilter : true)
            .map((team, index) => (
                <li className="item" key={`associationTeam_${index}`}>
                    <div className="product-img">
                        <Icon type="fa" name="shield-alt"color={team.color} size="3" />
                    </div>
                    <div className="product-info">
                        <div className="col-xs-11">
                            <a href="javascript:void(0)" className="product-title">{team.name}
                            <span className="label label-primary pull-right"></span></a>
                            <span className="product-description">
                                {this._getCategoryLabel(team.category)}
                                <div className="row">
                                    <Select options={statusOptions} value={team.status} size="small" disabled={!edit}
                                        onChange={e => this.props.tournamentStore.updateAssociationTeamFieldField(team.association._id, team, 'status', e.target.value)} />
                                </div>
                            </span>
                        </div>
                        <div className="col-xs-1 association-teams-actions">
                            <a role="button"
                                onClick={() => this._showModalTeamMembers(team.association, team)}>
                                <Icon type="fa" name="users" 
                                    alt="Cadastro de membros da equipe"
                                    title="Cadastro de membros da equipe" />
                                <span className="label label-members">{team.members ? team.members.length : 0}</span>
                            </a>
                        </div>
                    </div>
                </li>
            ));
    }

    _renderFilterCategory() {
        const options = [{ label: 'Todas', value:'' }].concat(this.props.tournamentStore.tournament.categories.map(category => {
            const suitLabel = getSuitLabel(category.suit);
            const categoryLabel = getCategoryLabel(category.category);
            return {
                label: `${categoryLabel} ${suitLabel}`,
                value: `${category.category}_${category.suit}`
            };
        })).sort((a, b) => a.label > b.label ? 1 : (a.label < b.label ? -1 : 0));
        return <Select options={options} value={this.state.categoryFilter} label="Categoria" 
                    onChange={e => this.setState({ categoryFilter: e.target.value})} />;
    }

    _renderFilterStatusRegistration() {
        const options = [{ label: 'Todas', value:'' }].concat(TOURNAMENT_ASSOCIATION_REGISTRATION_STATUS).sort((a, b) => a.label > b.label ? 1 : (a.label < b.label ? -1 : 0));
        return <Select options={options} value={this.state.statusRegistrationFilter} label="Situação de Inscrição" 
                    onChange={e => this.setState({ statusRegistrationFilter: e.target.value})} />;
    }

    _showModalTeamMembers(association, team) {
        this.setState({
            modalMembersTitle: `Membros da equipe ${team.name}`,
            modalMembersShow: true,
            modalMembersTeam: team,
            modalMembersAssociation: association
        });
    }

    _hideModalTeamMembers() {
        this.setState({
            modalMembersTitle: '',
            modalMembersShow: false,
            modalMembersTeam: {},
            modalMembersAssociation: {}
        });
    }

    render() {
        console.log('Render RegistrationTabForm');
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6">
                    <BoxWidget cols="12" title="Agremiações">
                        <ul className="products-list product-list-in-box">
                            {this._renderAssociations()}
                        </ul>
                    </BoxWidget> 
                </div>

                <div className="col-xs-12 col-sm-12 col-md-6">
                    <BoxWidget cols="12" title="Equipes">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                {this._renderFilterCategory()}
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6">
                                {this._renderFilterStatusRegistration()}
                            </div>
                        </div>
                        <ul className="products-list product-list-in-box">
                            {this._renderAssociationsTeams()}
                        </ul>
                    </BoxWidget>
                </div>
                <TeamMembers title={this.state.modalMembersTitle} 
                    team={this.state.modalMembersTeam} 
                    association={this.state.modalMembersAssociation}
                    show={this.state.modalMembersShow} 
                    edit={this.props.tournamentStore.edit}
                    onBack={this._hideModalTeamMembers} 
                    onClose={this._hideModalTeamMembers} 
                    />
            </div>
        )
    }
}
