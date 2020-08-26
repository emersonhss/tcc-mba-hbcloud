import { observable, action, computed } from "mobx";
import BaseStore from '../../../../stores/BaseStore';
import Game from "../models/Game";
import GameService from "../services/GameService";
import { getInvalidRequiredFields } from "../../utils/validators";

export default class GameStore extends BaseStore {

    @observable edit = true;
    @observable message = null;
    @observable game = new Game();
    @observable games = [];

    constructor() {
        super();
        this._service = new GameService();
    }

    _sortGoals = (goalA, goalB) => goalA.time > goalB.time ? 1 : (goalA.time < goalB.time ? -1 : 0);

    _sortWarning = (warningA, warningB) => warningA.time > warningB.time ? 1 : (warningA.time < warningB.time ? -1 : 0);

    _sortExclusion = (exclusionA, exclusionB) => exclusionA.time > exclusionB.time ? 1 : (exclusionA.time < exclusionB.time ? -1 : 0);

    _sortDisqualifications = (disqualificationA, disqualificationB) => disqualificationA.time > disqualificationB.time ? 1 : (disqualificationA.time < disqualificationB.time ? -1 : 0);

    _sortTechnicalTimes = (technicalTimesA, technicalTimesB) => technicalTimesA.time > technicalTimesB.time ? 1 : (technicalTimesA.time < technicalTimesB.time ? -1 : 0);

    @action
    updateField(field, value) {
        console.log('Field:', field, value);
        const newGame = this.game.clone();
        newGame[field] = value;
        this.game = newGame;
    }
    
    @action
    updateFieldTeam(team, field, value) {
        console.log('Field:', team, field, value);
        const newGame = this.game.clone();
        if(team.toUpperCase() === 'A') {
            const newTeamA = newGame.aTeam.clone();
            newTeamA[field] = value;
            newGame.aTeam = newTeamA;
        } else if(team.toUpperCase() === 'B'){
            const newTeamB = newGame.bTeam.clone();
            newTeamB[field] = value;
            newGame.bTeam = newTeamB;
        } else {
            throw new Error('Necessário informar se o time é A ou B');
        }
        this.game = newGame;
    }

    @action
    updateFieldGameSettings(field, value) {
        console.log('GameSettings Field:', field, value);
        const newGame = this.game.clone();
        const newSettings = newGame.settings.clone();
        newSettings[field] = value;
        newGame.settings = newSettings;
        this.game = newGame;
    }

    @action
    addNewMemberTeam(team) {
        const newGame = this.game.clone();
        if(team.toUpperCase() === 'A') {
            const newTeamA = newGame.aTeam.clone();
            newTeamA['members'].push({ edit: true });
         newGame.aTeam = newTeamA;
        } else if(team.toUpperCase() === 'B'){
            const newTeamB = newGame.bTeam.clone();
            newTeamB['members'].push({ edit: true });
         newGame.bTeam = newTeamB;
        } else {
            throw new Error('Necessário informar se o time é A ou B');
        }
        this.game = newGame;
    }

    @action
    removeMemberTeam(team, member) {
        console.log('Remove member', team, member);
        const newGame = this.game.clone();
        if(team.toUpperCase() === 'A') {
            const newTeamA = newGame.aTeam.clone();
            let index = newTeamA['members'].indexOf(member);
            console.log('Remove index team', team, index);
            if(index > -1) {
                // newTeamA['members'].filter(m => m !== member);
                newTeamA['members'].splice(index, 1);
                console.log('Team members', team, newTeamA['members']);
            }
            newGame.aTeam = newTeamA;
        } else if(team.toUpperCase() === 'B'){
            const newTeamB = newGame.bTeam.clone();
            let index = newTeamB['members'].indexOf(member);
            if(index > -1) {
                newTeamB['members'].splice(index, 1);
            }
            newGame.bTeam = newTeamB;
        } else {
            throw new Error('Necessário informar se o time é A ou B');
        }
        this.game = newGame;
    }

    @action
    changeFieldMemberTeam(team, indexMember, field, value) {
        const newGame = this.game.clone();
        if(team.toUpperCase() === 'A') {
            const newTeamA = newGame.aTeam.clone();
            newTeamA['members'][indexMember] = { ...newTeamA['members'][indexMember], [field]: value };
            newGame.aTeam = newTeamA;
        } else if(team.toUpperCase() === 'B'){
            const newTeamB = newGame.bTeam.clone();
            newTeamB['members'][indexMember] = { ...newTeamB['members'][indexMember], [field]: value };
            newGame.bTeam = newTeamB;
        } else {
            throw new Error('Necessário informar se o time é A ou B');
        }
        this.game = newGame;
    }

    _addTeamArrayField(field, team, value, sort) {
        console.log('Adiconando:', field, team, value);
        const newGame = this.game.clone();
        if(team.toUpperCase() === 'A') {
            const newTeamA = newGame.aTeam.clone();
            newTeamA[field].push(value);
            newTeamA[field] = newTeamA[field].sort(sort);
            console.log(newTeamA[field]);
            newGame.aTeam = newTeamA;
        } else if(team.toUpperCase() === 'B'){
            const newTeamB = newGame.bTeam.clone();
            newTeamB[field].push(value);
            newTeamB[field] = newTeamB[field].sort(sort);
            newGame.bTeam = newTeamB;
        } else {
            throw new Error('Necessário informar se o time é A ou B');
        }
        this.game = newGame;
        return value;
    }

    _editTeamArrayField(field, team, value, index, filter, sort) {
        const newGame = this.game.clone();
        if(team.toUpperCase() === 'A') {
            const newTeamA = newGame.aTeam.clone();
            const goalsLocalized = newTeamA[field].filter(filter)[index];
            const indexGoalLocalized = newTeamA[field].indexOf(goalsLocalized);
            if (indexGoalLocalized > -1) {
                newTeamA[field][indexGoalLocalized] = value;
            }
            newTeamA[field] = newTeamA[field].sort(sort);
            newGame.aTeam = newTeamA;
        } else if(team.toUpperCase() === 'B'){
            const newTeamB = newGame.bTeam.clone();
            const valuesLocalized = newTeamB[field].filter(filter)[index];
            const indexValueLocalized = newTeamB[field].indexOf(valuesLocalized);
            if (indexValueLocalized > -1) {
                newTeamB[field][indexValueLocalized] = value;
            }
            newTeamB[field] = newTeamB[field].sort(sort);
            newGame.bTeam = newTeamB;
        } else {
            throw new Error('Necessário informar se o time é A ou B');
        }
        this.game = newGame;
        return value;
    }

    _removeTeamArrayField(field, team, value, sort) {
        console.log('Removendo:', field, team, value);
        
        const newGame = this.game.clone();
        if(team.toUpperCase() === 'A') {
            const newTeamA = newGame.aTeam.clone();
            const index = newTeamA[field].indexOf(value);
            if(index > -1) {
                newTeamA[field].splice(index, 1);
                newTeamA[field] = newTeamA[field].sort(sort);
                newGame.aTeam = newTeamA;
            } else {
                console.log('Não encontrou elemento para remoção.');
                const items = newTeamA[field].filter(item => item.matchTime == value.matchTime && item.time == value.time && (!item.athlete || item.athlete.name == value.athlete.name));
                if (items.length > 0) {
                    console.log('Procurando elemento para remoção da segunda forma de busca.');
                    const index2 = newTeamA[field].indexOf(items[0]);
                    newTeamA[field].splice(index2, 1);
                    newTeamA[field] = newTeamA[field].sort(sort);
                    newGame.aTeam = newTeamA;
                } else {
                    console.log('Não encontrou elemento para remoção da segunda forma de busca.');
                }
            }
        } else if(team.toUpperCase() === 'B'){
            const newTeamB = newGame.bTeam.clone();
            const index = newTeamB[field].indexOf(value);
            console.log('Index Remove Goal:', index);
            if(index > -1) {
                newTeamB[field].splice(index, 1);
                newTeamB[field] = newTeamB[field].sort(sort);
                newGame.bTeam = newTeamB;
            } else {
                console.log('Não encontrou elemento para remoção.');
                const items = newTeamB[field].filter(item => item.matchTime == value.matchTime && item.time == value.time && (!item.athlete || item.athlete.name == value.athlete.name));
                if (items.length > 0) {
                    console.log('Procurando elemento para remoção da segunda forma de busca.');
                    const index2 = newTeamB[field].indexOf(items[0]);
                    newTeamB[field].splice(index2, 1);
                    newTeamB[field] = newTeamB[field].sort(sort);
                    newGame.aTeam = newTeamB;
                } else {
                    console.log('Não encontrou elemento para remoção da segunda forma de busca.');
                }
            }
        } else {
            throw new Error('Necessário informar se o time é A ou B');
        }
        this.game = newGame;
        return value;
    }

    @action
    addTeamGoal(team, goal) {
        console.log('Adiconando Goal:', team, goal);
        if (!goal.matchTime || !goal.time) {
            this.message = { type: 'danger', text: 'É necessário informar o tempo em que o gol ocorreu.' };
            this.cleanMessage();
            return null;
        } else {
            return this._addTeamArrayField('goals', team, goal, this._sortGoals);
        }
    }

    @action
    editTeamGoal(team, matchTime, index, goal) {
        console.log('Editando Goal:', team, matchTime, index, goal);
        if (!goal.matchTime || !goal.time) {
            this.message = { type: 'danger', text: 'É necessário informar o tempo em que o gol ocorreu.' };
            this.cleanMessage();
            return null;
        } else {
            return this._editTeamArrayField('goals', team, goal, index, goal => goal.matchTime === matchTime, this._sortGoals);
        }
    }

    @action
    removeTeamGoal(team, goal) {
        return this._removeTeamArrayField('goals', team, goal, this._sortGoals);
    }

    @action
    addTeamWarning(team, warning) {
        console.log('Adiconando warning:', team, warning);
        if (!warning.matchTime || !warning.time) {
            this.message = { type: 'danger', text: 'É necessário informar o tempo em que a advertência ocorreu.' };
            this.cleanMessage();
            return null;
        } else {
            return this._addTeamArrayField('warnings', team, warning, this._sortWarning);
        }
    }

    @action
    editTeamWarning(team, matchTime, index, warning) {
        console.log('Editando warning:', team, matchTime, index, warning);
        if (!warning.matchTime || !warning.time) {
            this.message = { type: 'danger', text: 'É necessário informar o tempo em que a advertência ocorreu.' };
            this.cleanMessage();
            return null;
        } else {
            return this._editTeamArrayField('warnings', team, warning, index, warning => warning.matchTime === matchTime, this._sortWarning);
        }
    }

    @action
    removeTeamWarning(team, warning) {
        return this._removeTeamArrayField('warnings', team, warning, this._sortWarning);
    }

    @action
    addTeamExclusion(team, exclusion) {
        console.log('Adiconando exclusion:', team, exclusion);
        if (!exclusion.matchTime || !exclusion.time) {
            this.message = { type: 'danger', text: 'É necessário informar o tempo em que a exclusão ocorreu.' };
            this.cleanMessage();
            return null;
        } else {
            return this._addTeamArrayField('exclusions', team, exclusion, this._sortExclusion);
        }
    }

    @action
    editTeamExclusion(team, matchTime, index, exclusion) {
        console.log('Editando exclusion:', team, matchTime, index, exclusion);
        if (!exclusion.matchTime || !exclusion.time) {
            this.message = { type: 'danger', text: 'É necessário informar o tempo em que a exclusão ocorreu.' };
            this.cleanMessage();
            return null;
        } else {
            return this._editTeamArrayField('exclusions', team, exclusion, index, exclusion => exclusion.matchTime === matchTime, this._sortExclusion);
        }
    }

    @action
    removeTeamExclusion(team, exclusion) {
        return this._removeTeamArrayField('exclusions', team, exclusion, this._sortExclusion);
    }

    @action
    addTeamDisqualification(team, disqualification) {
        console.log('Adiconando disqualification:', team, disqualification);
        if (!disqualification.matchTime || !disqualification.time) {
            this.message = { type: 'danger', text: 'É necessário informar o tempo em que a desqualificação ocorreu.' };
            this.cleanMessage();
            return null;
        } else {
            return this._addTeamArrayField('disqualifications', team, disqualification, this._sortDisqualifications);
        }
    }

    @action
    editTeamDisqualification(team, matchTime, index, disqualification) {
        console.log('Editando disqualification:', team, matchTime, index, disqualification);
        if (!disqualification.matchTime || !disqualification.time) {
            this.message = { type: 'danger', text: 'É necessário informar o tempo em que a desqualificação ocorreu.' };
            this.cleanMessage();
            return null;
        } else {
            return this._editTeamArrayField('disqualifications', team, disqualification, index, disqualification => disqualification.matchTime === matchTime, this._sortDisqualifications);
        }
    }

    @action
    removeTeamDisqualification(team, disqualification) {
        return this._removeTeamArrayField('disqualifications', team, disqualification, this._sortDisqualifications);
    }

    @action
    addTeamTechnicalTime(team, technicalTime) {
        console.log('Adiconando technicalTime:', team, technicalTime);
        if (!technicalTime.matchTime || !technicalTime.time) {
            this.message = { type: 'danger', text: 'É necessário informar o tempo em que o tempo técnico ocorreu.' };
            this.cleanMessage();
            return null;
        } else {
            return this._addTeamArrayField('technicalTimes', team, technicalTime, this._sortTechnicalTimes);
        }
    }

    @action
    editTeamTechnicalTime(team, matchTime, index, technicalTime) {
        console.log('Editando technicalTime:', team, matchTime, index, technicalTime);
        if (!technicalTime.matchTime || !technicalTime.time) {
            this.message = { type: 'danger', text: 'É necessário informar o tempo em que o tempo técnico ocorreu.' };
            this.cleanMessage();
            return null;
        } else {
            return this._editTeamArrayField('technicalTimes', team, technicalTime, index, technicalTime => technicalTime.matchTime === matchTime, this._sortTechnicalTimes);
        }
    }

    @action
    removeTeamTechnicalTime(team, technicalTime) {
        return this._removeTeamArrayField('technicalTimes', team, technicalTime, this._sortTechnicalTimes);
    }

    @action
    cleanTeamGoals(team) {
        console.log('Lipando Goals:', team);
        
        const newGame = this.game.clone();
        if(team.toUpperCase() === 'A') {
            const newTeamA = newGame.aTeam.clone();
            newTeamA['goals'] = [];
            newGame.aTeam = newTeamA;
        } else if(team.toUpperCase() === 'B'){
            const newTeamB = newGame.bTeam.clone();
            newTeamB['goals'] = [];
            newGame.bTeam = newTeamB;
        } else {
            throw new Error('Necessário informar se o time é A ou B');
        }
        this.game = newGame;
    }

    cleanMessage() {
        setTimeout(() => {
            this.message = null;
        } ,5000);
    }

    @action
    async saveGame() {
        console.log('Salvando a partida');
        const invalidRequiredFields = getInvalidRequiredFields(this.game, ['date', 'time', 'locality', 'aTeam.name', 'bTeam.name']);
        console.log('Validando...', invalidRequiredFields);

        if (invalidRequiredFields) {
            this.message = { type: 'danger', text: `Campos obrigatórios não preenchidos: ${invalidRequiredFields.join(', ')}` };
            this.cleanMessage();
            return false;
        }

        try {
            const newGame = await this._service.save(this.game);
            console.log('Partida adicionada:', newGame._id);
            this.game = newGame;
            this.edit = false;
            this.message = { type: 'success', text: 'Partida salva com sucesso!' };
            this.cleanMessage();
            return true;
        } catch(error) {
            console.error(error);
            this.message = { type: 'danger', text: error };
            this.cleanMessage();
            return false;
        }
    }

    @action
    listGames() {
        console.log('Adicionando a partida');
        this._service.listAll()
            .then(list => {
                console.log('Partidas:', list.length);
                this.games = list ? [].concat(list) : [];
                this.edit = false;
                // this.message = { type: 'success', text: 'Partida cadastrada com sucesso!' };
            })
            // TODO apresentar uma mensagem de erro adequada.
            .catch(error => {
                console.error(error);
                this.message = { type: 'danger', text: error };
            });
    }

    @action
    newGame() {
        this.edit = true;
        this.game = new Game();
    }

    
    @action
    editGame(gameId) {
        this.edit = true;
        this._service.get(gameId)
            .then(game => {
                console.log('Partida localizada:', game);
                if (game) {
                    this.game = game;
                } else {
                    this.game = new Game();
                }
            })
            .catch(error => console.error(error));
    }

    @action
    viewGame(gameId) {
        this.edit = false;
        this._service.get(gameId)
            .then(game => {
                console.log('Partida localizada:', game);
                if (game) {
                    this.game = game;
                } else {
                    this.message = { type: 'warning', text: 'Partida não localizada.' };
                }
            })
            .catch(error => console.error(error));
    }

    @computed get gameTimeline() {
        const aTeamTimeline = this.game.aTeam.getTeamTimeline().map(timelineItem => ({...timelineItem, team: { tag: 'A', name: this.game.aTeam.name, color: this.game.aTeam.color }}));
        const bTeamTimeline = this.game.bTeam.getTeamTimeline().map(timelineItem => ({...timelineItem, team: { tag: 'B', name: this.game.bTeam.name, color: this.game.bTeam.color }}));
        const timeline = [].concat(aTeamTimeline).concat(bTeamTimeline);
        console.log('Timeline:', timeline);
        return timeline;
    }

}