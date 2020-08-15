import { observable, action, computed } from "mobx";
import BaseStore from '../../../../stores/BaseStore';
import { getInvalidRequiredFields } from "../../utils/validators";
import Tournament from "../models/Tournament";
import TournamentCategory from "../models/TournamentCategory";
import { getSuitLabel } from "../../constants/suits";
import { getCategoryLabel } from "../../constants/categories";
import TournamentService from "../services/TournamentService";

export default class TournamentStore extends BaseStore {

    @observable edit = true;
    @observable message = null;
    @observable tournament = new Tournament();
    @observable tournaments = [];
    @observable myRegistrations = [];

    constructor() {
        super();
        this._service = new TournamentService();
    }

    @action
    updateField(field, value) {
        console.log('Field:', field, value);
        const newTournament = this.tournament.clone();
        newTournament[field] = value;
        this.tournament = newTournament;
    }

    @action
    addCategory(newCategory) {
        if( !newCategory.suit && !newCategory.category ) {
            this.setMessage('danger','É necessário informar o o naipe e a categoria.');
            return false;
        }

        const categoriesEquals = this.tournament.categories.filter(category => category.suit === newCategory.suit && category.category === newCategory.category);
        if (categoriesEquals && categoriesEquals.length > 0) {
            this.setMessage('danger','Essa categoria já foi adicionada.');
            return false;
        }

        this.tournament.categories.push(new TournamentCategory({ ...newCategory }));
        return true;
    }

    @action
    removeCategory(removeCategory) {
        const index = this.tournament.categories.indexOf(removeCategory);
        if (index >= 0) {
            const newCategories = [].concat(this.tournament.categories);
            newCategories.splice(index, 1);
            this.tournament.categories = newCategories;
            this.setMessage('success', `Categoria ${getSuitLabel(removeCategory.suit)} ${getCategoryLabel(removeCategory.category)} removida.`);
            return true;
        } 
        this.setMessage('danger','Não foi possível remover a categoria.');
        return false;
    }

    @action
    newTournament() {
        this.edit = true;
        this.tournament = new Tournament();
    }

    @action
    editTournament(tournamentId) {
        this.edit = true;
        this._service.get(tournamentId)
            .then(tournament => {
                console.log('Competição localizada:', tournament);
                if (tournament) {
                    this.tournament = tournament;
                } else {
                    this.tournament = new Tournament();
                }
            })
            .catch(error => console.error(error));
    }

    @action
    viewTournament(tournamentId) {
        this.edit = false;
        this._service.get(tournamentId)
            .then(tournament => {
                console.log('Competição localizada:', tournament);
                if (tournament) {
                    this.tournament = tournament;
                } else {
                    this.setMessage('warning', 'Competição não localizada.');
                }
            })
            .catch(error => console.error(error));
    }

    @action
    getTournament(tournamentId) {
        this._service.get(tournamentId)
            .then(tournament => {
                console.log('Competição localizada:', tournament);
                if (tournament) {
                    this.tournament = tournament;
                } else {
                    this.setMessage('warning', 'Competição não localizada.');
                }
            })
            .catch(error => console.error(error));
    }

    @action
    async saveTournament() {
        console.log('Salvando a competição');
        const invalidRequiredFields = getInvalidRequiredFields(this.tournament, ['name', 'status', 'startDate', 'endDate', 'locality']);
        console.log('Validando...', invalidRequiredFields);

        if (invalidRequiredFields) {
            this.setMessage('danger', `Campos obrigatórios não preenchidos: ${invalidRequiredFields.join(', ')}`);
            return false;
        }

        try {
            const newTournament = await this._service.save(this.tournament);
            console.log('Competição adicionada:', newTournament._id);
            this.tournament = newTournament;
            this.edit = false;
            this.setMessage('success', 'Competição salva com sucesso!');
            return true;
        } catch(error) {
            console.error(error);
            this.setMessage('danger', error);
            return false;
        }
    }

    @action
    listTournaments() {
        console.log('Listando a competições');
        this._service.listAll()
            .then(list => {
                console.log('Competições:', list.length);
                this.tournaments = list ? [].concat(list) : [];
                this.edit = false;
            })
            // TODO apresentar uma mensagem de erro adequada.
            .catch(error => {
                console.error(error);
                this.setMessage('danger', error);
            });
    }

    @action
    async saveRegistration(association, user) {

        // Validar dados da association e teams
        console.log('Associação a ser inscrita:', association);

        if (!association.status) {
            association.status = 'registered';
            association.dateRegistration = new Date().toISOString();
            association.userRegistration = user;
        }

        // remove proxy array
        association.teams = association.teams ? association.teams.slice() : [];
        association.teams.forEach(team => {
            team.members = team.members ? team.members.slice().map(member => ({...member})) : [];
        });

        if (association._id) {
            const indexAssociation = this.tournament.associations.findIndex((assoc, index, array) => assoc._id === association._id);
            if(indexAssociation > -1) {
                association.dateLastUpdate = new Date().toISOString();
                this.tournament.associations[indexAssociation] = association;
            }
        } else {
            // Inserindo uma nova agremiação na competição;
            const newId = this.tournament.associations.length + 1;
            association._id = newId;
            this.tournament.associations.push(association);
        }
        this.edit = false;
        return await this.saveTournament();
    }

    @action
    listMyRegistrations(user) {
        console.log('Listando as minhas inscrições em competições');
        this._service.listMyRegistrations(user)
            .then(list => {
                console.log('Minhas inscrições em competições:', list.length);
                this.myRegistrations = list ? [].concat(list) : [];
                this.edit = false;
            })
            // TODO apresentar uma mensagem de erro adequada.
            .catch(error => {
                console.error(error);
                this.setMessage('danger', error);
            });
    }

    @action
    updateAssociationField(associationId, field, value) {
        console.log('Association Field:', associationId, field, value);
        const newTournament = this.tournament.clone();
        const index = newTournament.associations.findIndex(association => association._id === associationId);
        if(index >= 0) {
           newTournament.associations[index][field] = value;
        }
        this.tournament = newTournament;
    }

    @action
    updateAssociationTeamFieldField(associationId, team, field, value) {
        console.log('Association Tema Field:', associationId, team, field, value);
        const newTournament = this.tournament.clone();
        const index = newTournament.associations.findIndex(association => association._id === associationId);
        if(index >= 0) {
           const teamLocalized = newTournament.associations[index].teams.filter(teamFilter => teamFilter.name === team.name);
           if(teamLocalized.length > 0) {
                teamLocalized[0][field] = value;
           }
        }
        this.tournament = newTournament;
    }

    @action
    addNewMemberTeam(associationId, team) {
        console.log('New member to association team:', associationId, team);
        const newTournament = this.tournament.clone();
        const index = newTournament.associations.findIndex(association => association._id === associationId);
        if(index >= 0) {
           const teamLocalized = newTournament.associations[index].teams.filter(teamFilter => teamFilter.name === team.name);
           if(teamLocalized.length > 0) {
                if (!teamLocalized[0]['members']) {
                    teamLocalized[0]['members'] = [];
                }
                teamLocalized[0]['members'].push({ edit: true });
           }
        }
        this.tournament = newTournament;
    }

    @action
    removeMemberTeam(associationId, team, memberIndex) {
        console.log('Remove member to association team:', associationId, team);
        const newTournament = this.tournament.clone();
        const index = newTournament.associations.findIndex(association => association._id === associationId);
        if(index >= 0) {
           const teamLocalized = newTournament.associations[index].teams.filter(teamFilter => teamFilter.name === team.name);
           if(teamLocalized.length > 0 && teamLocalized[0]['members']) {
                teamLocalized[0]['members'].splice(memberIndex, 1);
           }
        }
        this.tournament = newTournament;
    }

    @action
    changeFieldMemberTeam(associationId, team, memberIndex, field, value) {
        console.log('Change field member to association team:', associationId, team, memberIndex, field, value);
        const newTournament = this.tournament.clone();
        const index = newTournament.associations.findIndex(association => association._id === associationId);
        if(index >= 0) {
           const teamLocalized = newTournament.associations[index].teams.filter(teamFilter => teamFilter.name === team.name);
           if(teamLocalized.length > 0 && teamLocalized[0]['members']) {
                teamLocalized[0]['members'][memberIndex][field] = value;
           }
        }
        this.tournament = newTournament;
    }

    @computed
    get tournamentId() {
        return this.tournament._id;
    }

    setMessage(type, message) {
        this.message = { type: type, text: message };
        this.cleanMessage();
    }

    cleanMessage() {
        setTimeout(() => {
            this.message = null;
        } ,5000);
    }

}