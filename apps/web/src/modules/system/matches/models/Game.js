import BaseModel from '../../models/BaseModel';
import Team from './Team';
import GameSettings from './GameSettings';

export default class Game extends BaseModel {

    constructor(literalObject) {
        super();
        if(literalObject) {
            const {_id, aTeam, bTeam, locality, date, time, suit, category, startExecution, endExecution, referee, tournament, settings} = literalObject;
            this._id = _id;
            this.aTeam = new Team({...aTeam});
            this.bTeam = new Team({...bTeam});
            this.locality = locality;
            this.date = date;
            this.time = time;
            this.suit = suit;
            this.category = category;
            this.startExecution = startExecution;
            this.endExecution = endExecution;
            this.referee = referee;
            this.tournament = tournament;
            this.settings = new GameSettings({...settings});
        } else {
            this._id = '';
            this.aTeam = new Team();
            this.bTeam = new Team();
            this.locality = '';
            this.date = '';
            this.time = '';
            this.suit = '';
            this.category = '';
            this.startExecution = null;
            this.endExecution = null;
            this.referee = [];
            this.tournament = null;
            this.settings = new GameSettings();
        }
    }

    isStarted() {
        return this.startExecution || this.aTeam.hasGameRegisters() || this.bTeam.hasGameRegisters();
    }

    isEnded() {
        return this.endExecution;
    }

    clone() {
        return super.clone(new Game());
    }

}