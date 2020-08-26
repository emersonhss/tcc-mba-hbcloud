import { observable, action, computed } from "mobx";
import BaseStore from '../../../../stores/BaseStore';
import { getInvalidRequiredFields } from "../../utils/validators";
import Tournament from "../models/Tournament";
import TournamentCategory from "../models/TournamentCategory";
import { getSuitLabel } from "../../constants/suits";
import { getCategoryLabel } from "../../constants/categories";
import TournamentService from "../services/TournamentService";
import Association from "../models/Association";
import AssociationTeam from "../models/AssociationTeam";

export default class TournamentRegistrationStore extends BaseStore {

    @observable edit = true;
    @observable message = null;
    @observable association = new Association();
    @observable associationTeams = [];

    constructor() {
        super();
        this._service = new TournamentService();
    }

    @action
    updateField(field, value) {
        console.log('Field:', field, value);
        const newTournamentRegistration = this.association.clone();
        newTournamentRegistration[field] = value;
        this.association = newTournamentRegistration;
    }

    @action
    addNewAssociationTeam() {
        console.log('Adicionando um novo time!');
        const newAssociationTeams = [].concat(this.associationTeams);
        newAssociationTeams.push(new AssociationTeam());
        this.associationTeams = newAssociationTeams;
        console.log(this.associationTeams);
    }

    @action
    changeFieldAssociationTeam(index, field, value) {
        this.associationTeams[index] = new AssociationTeam({ ...this.associationTeams[index], [field]: value });
    }

    @action
    setAssociation(association) {
        if(association) {
            this.association = new Association({ ...association });
            this.associationTeams = [].concat(association.teams);
        } else {
            this.association = new Association();
        }
    }

    @action
    newAssociation() {
        this.setAssociation();
        this.associationTeams = [];
        this.setEdit(true);
    }

    @action
    editAssociation(association, edit) {
        this.setAssociation(association);
        this.associationTeams = association ? (association.teams ? association.teams.slice() : []) : [];
        this.setEdit(edit);
    }

    @action
    setEdit(edit) {
        this.edit = edit;
    }

    @action
    addNewMemberTeam(team) {
        console.log('New member to association team:', team);
        const cloneAssociationTeams = [].concat(this.associationTeams.slice());
        const teamLocalized = cloneAssociationTeams.filter(teamFilter => teamFilter.name === team.name && teamFilter.category === team.category);
        if(teamLocalized.length > 0) {
                if (!teamLocalized[0]['members']) {
                    teamLocalized[0]['members'] = [];
                }
                teamLocalized[0]['members'].push({ edit: true });
        }
        this.associationTeams = cloneAssociationTeams;
    }

    @action
    removeMemberTeam(team, memberIndex) {
        console.log('Remove member to association team:', team);
        const cloneAssociationTeams = [].concat(this.associationTeams.slice());
        const teamLocalized = cloneAssociationTeams.filter(teamFilter => teamFilter.name === team.name && teamFilter.category === team.category);
        if(teamLocalized.length > 0 && teamLocalized[0]['members']) {
            teamLocalized[0]['members'].splice(memberIndex, 1);
        }
        this.associationTeams = cloneAssociationTeams;
    }

    @action
    changeFieldMemberTeam(team, memberIndex, field, value) {
        console.log('Change field member to association team:', team, memberIndex, field, value);
        const cloneAssociationTeams = [].concat(this.associationTeams.slice());
        const teamLocalized = cloneAssociationTeams.filter(teamFilter => teamFilter.name === team.name && teamFilter.category === team.category);
        if(teamLocalized.length > 0 && teamLocalized[0]['members']) {
            teamLocalized[0]['members'][memberIndex][field] = value;
        }
        this.associationTeams = cloneAssociationTeams;
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