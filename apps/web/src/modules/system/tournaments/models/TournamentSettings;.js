import BaseModel from '../../models/BaseModel';

export default class TournamentSettings extends BaseModel {

    constructor(literalObject) {
        super();
        if(literalObject) {
            const { _id, maxTeamsByCategory, minTeamsByCategory, maxAthletesByTeam, maxLeadersByTeam } = literalObject;
            this._id = _id;
            this.maxTeamsByCategory = maxTeamsByCategory;
            this.minTeamsByCategory = minTeamsByCategory;
            this.maxAthletesByTeam = maxAthletesByTeam;
            this.maxLeadersByTeam = maxLeadersByTeam;
        } else {
            this._id = '';
            this.maxTeamsByCategory = 48;
            this.minTeamsByCategory = 3;
            this.maxAthletesByTeam = 16;
            this.maxLeadersByTeam = 4;
        }
    }

    clone() {
        return super.clone(new TournamentSettings());
    }

}