import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Content from '../../../layout/Content';
import BreadCrumb from '../../../layout/BreadCrumb';
import BoxWidget from '../../../layout/BoxWidget';
import Alert from '../../../components/Alert';
import DatePicker from '../../../components/forms/DatePicker';
import Input from '../../../components/forms/Input';
import Select from '../../../components/forms/Select';
import Icon from '../../../layout/Icon';
import NavTabs, { NavTabItem } from '../../../components/NavTabs';
import TransictionPage from '../../../components/TransictionPage';
import SUITS, { getSuitLabel } from '../constants/suits';
import CATEGORIES, { getCategoryLabel } from '../constants/categories';
import TOURNAMENT_STATUS from '../constants/tournament-status';
import TextArea from '../../../components/forms/TextArea';
import TOURNAMENT_REGISTRATION_STATUS from '../constants/tournament-registration-status';
import BgColorSelect from '../../../components/forms/BgColorSelect';
import './TournamentEditContainer.css';
import { getStatusRegistrationLabel, CANCELED, CONFIRMED } from '../constants/tournament-registration-association-status';
import Association from './models/Association';
import './components/RegistrationsTabForm.css';
import TeamMembers from './components/TeamMembers';

const BASE_URI = '/app/competicoes';

const getBreadCrumb = (title, tournamentName) => {
    return [
        {
            link: '/',
            title: 'Início'
        },
        {
            link: '/app/competicoes',
            title: 'Competições'
        },
        {
            link: '/app/competicoes/1',
            title: tournamentName
        },
        {
            title,
            active: true
        }
      ];
}

@inject("routerStore")
@inject("userStore")
@inject("tournamentStore")
@inject("tournamentRegistrationStore")
@observer
export default class TournamentEditContainer extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            viewTournamentId: undefined,
            viewType: undefined,
            action: undefined,
            showSettings: false,
            cropperOpen: false,
            categoryEdit: {},
            modalMembersTitle: '',
            modalMembersShow: false,
            modalMembersTeam: {}
        };

        this._addNewTeam = this._addNewTeam.bind(this);
        this._editFieldTeam = this._editFieldTeam.bind(this);
        this._loadAssociation = this._loadAssociation.bind(this);
        this._saveTournamentRegistration = this._saveTournamentRegistration.bind(this);
        this._showModalTeamMembers = this._showModalTeamMembers.bind(this);
        this._hideModalTeamMembers = this._hideModalTeamMembers.bind(this);
    }

    componentDidMount() {
        console.log('Montando tela de inscrição em competição...');
        const { id } = this.props.match.params;
        
        if (id) {
            this.props.tournamentStore.getTournament(parseInt(id));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('ComponentDidUpdate:', prevProps, prevState, snapshot);
        const { id, view, viewAction } = this.props.match.params;
        const { tournament, message } = this.props.tournamentStore;
        const { association } = this.props.tournamentRegistrationStore;

        console.log('MatchParams:', id, view, viewAction);

        // Se a competição já foi carregada
        if(tournament._id && tournament._id == id) {
            if((view === 'nova' && association._id) || (view !== 'nova' && association._id != view) 
                || (prevProps.match.params.view !== view || prevProps.match.params.viewAction !== viewAction)) {
                this._loadAssociation(tournament, view, viewAction);
            }

        } else if (tournament._id && tournament._id != id) {
            this.props.tournamentStore.getTournament(parseInt(id));
        }
        
        if (association._id == view && message && message.type === 'success' && viewAction === 'edit') {
            console.log('Redirencionando para view', view, 'view');
            this.props.history.replace(`${BASE_URI}/${tournament._id}/inscricao/${association._id}`);
        } else if (view === 'nova'&& !association._id && message && message.type === 'success') {
            console.log('Redirencionando para minhas inscrições...');
            this.props.history.replace(`${BASE_URI}/minhas-inscricoes`);
        }
    }

    _loadAssociation(tournament, view, viewAction) {
        if (view === 'nova' && !viewAction) {
            this.props.tournamentRegistrationStore.newAssociation();
        } else {
            console.log('Procurando associação:', view, tournament.associations);
            let associationFiltered = tournament.associations.filter(association => association._id == view);
            console.log('Associação encontrada:', view, associationFiltered);
            associationFiltered = associationFiltered.length > 0 ? associationFiltered[0] : null;
            // Abrir para edição ou visualização da incrição.
            this.props.tournamentRegistrationStore.editAssociation(associationFiltered, viewAction === 'edit');
        }
    }

    _saveTournamentRegistration() {
        const { association, associationTeams } = this.props.tournamentRegistrationStore;
        const associationClone = association.clone();
        associationClone.teams = associationTeams ? associationTeams.slice().map(assoc => ({ 
            ...assoc, 
            members: assoc.members ? assoc.members.slice(): [] , 
            association: { 
                _id: associationClone._id, 
                name: associationClone.name, 
                color: associationClone.color, 
                image: associationClone.image 
            } 
        })) : [];
        this.props.tournamentStore.saveRegistration(associationClone, this.props.userStore.user);
    }

    _editTournamentRegistration() {
        this.props.history.replace(`${BASE_URI}/${this.props.tournamentStore.tournament._id}/inscricao/${this.props.tournamentRegistrationStore.association._id}/edit`);
    }

    _cancel() {
        this.props.history.replace(BASE_URI);
    }

    _renderColorButton(edit) {
        const { association } = this.props.tournamentRegistrationStore;
        if(edit) {
            return <BgColorSelect label={`Cor da agremiação`} value={association.color}
                        onChange={(value) => this.props.tournamentRegistrationStore.updateField('color', value)} />
        }
        return null;
    }

    _renderButtons() {
        if (!this.props.tournamentRegistrationStore.edit) {
            return (
                <div className="form-group-buttons">
                    <div className="buttons-left">
                        <button type="button" className="btn btn-default" onClick={() => this._cancel()}>Cancelar</button>
                    </div>

                    <div className="buttons-right">
                        <button type="button" className="btn btn-primary" onClick={() => this._editTournamentRegistration()}><Icon type="fa" name="edit" /> Editar</button>
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
                        <button type="button" className="btn btn-primary" onClick={() => this._saveTournamentRegistration()}><Icon type="fa" name="check" /> Salvar</button>
                    </div>
                </div>
            );
        }
    }

    _addNewTeam(e) {
        this.props.tournamentRegistrationStore.addNewAssociationTeam();
    }

    _renderButtonAddTeam(edit) {
        return (
            <button className="btn btn-default btn-sm" disabled={!edit} onClick={this._addNewTeam}><Icon type="fa"name="plus" /> Adicionar</button>
        );
    }

    _editFieldTeam(index, field, value) {
        this.props.tournamentRegistrationStore.changeFieldAssociationTeam(index, field, value);
    }

    _showModalTeamMembers(team) {
        this.setState({
            modalMembersTitle: `Membros da equipe ${team.name}`,
            modalMembersShow: true,
            modalMembersTeam: team
        });
    }

    _hideModalTeamMembers() {
        this.setState({
            modalMembersTitle: '',
            modalMembersShow: false,
            modalMembersTeam: {}
        });
    }

    _renderTeamEditLine(index, team, edit) {
        const options = [{ label: 'Selecione...', value:'' }].concat(this.props.tournamentStore.tournament.categories.map(category => {
            const suitLabel = getSuitLabel(category.suit);
            const categoryLabel = getCategoryLabel(category.category);
            return {
                label: `${categoryLabel} ${suitLabel}`,
                value: `${category.category}_${category.suit}`
            };
        }));
        return (
            <tr key={`teamAssociation_${index}`}>
                <td>{index + 1}.</td>
                <td><Input value={team.name} size="small" placeholder="Nome" disabled={!edit} onChange={e => this._editFieldTeam(index, 'name', e.target.value)} /></td>
                <td><Select options={options} value={team.category} size="small" disabled={!edit} onChange={e => this._editFieldTeam(index, 'category', e.target.value)} /></td>
                {this._renderTdTeamStatusRegistration(team)}
                <td className="association-teams-actions">
                    <a role="button"
                        onClick={() => this._showModalTeamMembers(team)}>
                        <Icon type="fa" name="users" 
                            alt="Cadastro de membros da equipe"
                            title="Cadastro de membros da equipe" />
                        <span className="label label-members">{team.members ? team.members.length : 0}</span>
                    </a>
                </td>
            </tr>
        );
    }

    _renderStatusRegistration(association) {
        if(association.status) {
            let statusView = 'info';
            switch(association.status) {
                case CANCELED:
                    statusView = 'danger';
                    break;
                case CONFIRMED:
                    statusView = 'success';
                    break;
                default:
                    statusView = 'info';
            }
            return (
                <div className={`callout callout-${statusView}`}>
                    <h4>Situação da Inscrição: {getStatusRegistrationLabel(association.status)}</h4>
                </div>
            );
        }
        return null;
    }

    _renderTdTeamStatusRegistration(team) {
        let classTextColor = '';
        switch(team.status) {
            case CANCELED:
                classTextColor = 'text-red';
                break;
            case CONFIRMED:
                classTextColor = 'text-green';
                break;
            default:
                classTextColor = '';
        }
        return <td className={classTextColor}>{getStatusRegistrationLabel(team.status)}</td>;
    }

    render() {
        // const { viewType, viewTournamentId, action, showSettings } = this.state;
        // console.log('View:', action, viewType, viewTournamentId);
        const { tournament, message } = this.props.tournamentStore;
        const { association, associationTeams, edit } = this.props.tournamentRegistrationStore;
        console.log('Render TournamentRegistrationContainer...', tournament, association);
        if (!tournament._id) {
            return <TransictionPage />;
        }
        
        const titlePage = 'Inscrição';
        const subTitlePage = `Competição: ${this.props.tournamentStore.tournament.name}`;
        
        return (
            <Content title={titlePage} subtitle={subTitlePage} breadCrumb={<BreadCrumb arrayModel={getBreadCrumb(titlePage, tournament.name)} />} >
                <Alert visible={message} type={message ? message.type :  ''} text={message ? message.text :  ''} />

                <div className="row">
                    <BoxWidget title={`Agremiação`} cols="12">
                        <div className="row">
                            <div className="tournament-column-one col-xs-12 col-sm-12 col-md-3">
                                <div className={`tournament-column-one-image ${association.color ? `bg-${association.color}` : 'bg-blue'}`}>
                                    <a href="javascript:;">
                                        <span className="">
                                            <Icon type="fa" name="shield-alt" size="5" />
                                        </span>
                                    </a>
                                    {this._renderColorButton(edit)}
                                </div>
                            </div>
                            <div className="tournament-column-two col-xs-12 col-sm-12 col-md-9">

                                {this._renderStatusRegistration(association)}

                                <Input cols="12" 
                                    id="ipt-tournament-association-name" 
                                    label="Nome da agremiação" 
                                    placeholder="Nome da agremiação" 
                                    disabled={!edit}
                                    value={association.name}
                                    onChange={(e) => this.props.tournamentRegistrationStore.updateField('name', e.target.value)}
                                    onBlur={(e) => this.props.tournamentRegistrationStore.updateField('name', e.target.value)}  />

                                <Input type="text" cols='12'
                                    id="ipt-tournament-association-locality" 
                                    label="Localidade da associação"
                                    placeholder="Exemplo: João Pessoa, Paraíba, Brasil"
                                    value={association.locality} 
                                    disabled={!edit}
                                    onChange={(e) => this.props.tournamentRegistrationStore.updateField('locality', e.target.value)}
                                    onBlur={(e) => this.props.tournamentRegistrationStore.updateField('locality', e.target.value)}
                                    groupBeforeRender={() => <Icon type="fa" name="map-marker-alt" />} />

                            </div>
                        </div>
                    </BoxWidget>

                    <BoxWidget title={`Equipes`} cols="12" pullRightContent={this._renderButtonAddTeam(edit)}>

                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box-body no-padding table-responsive ">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th style={{width: 10}}>#</th>
                                                <th>Nome</th>
                                                <th>Categoria</th>
                                                <th>Situação da inscrição</th>
                                                {edit ? <th style={{width: 10}} colSpan="2">Ações</th> : null }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {associationTeams && associationTeams.length > 0 ? 
                                                associationTeams.map((team, index) => this._renderTeamEditLine(index, team, edit))
                                                :
                                                <tr><td colSpan="5">Nenhuma equipe inscrita.</td></tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    
                    </BoxWidget>

                    <TeamMembers title={this.state.modalMembersTitle} 
                        team={this.state.modalMembersTeam} 
                        show={this.state.modalMembersShow} 
                        edit={this.props.tournamentStore.edit}
                        onBack={this._hideModalTeamMembers} 
                        onClose={this._hideModalTeamMembers} />
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {this._renderButtons()}
                    </div>
                </div>

            </Content>
        );
    }
}