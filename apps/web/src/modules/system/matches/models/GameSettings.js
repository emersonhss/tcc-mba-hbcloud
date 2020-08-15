import BaseModel from '../../models/BaseModel';

export default class GameSettings extends BaseModel {

    constructor(literalObject) {
        super();
        if(literalObject) {
            const { _id, quantityNormalTimes, quantityExtraTimes, normalTime, extraTime, technicalTimesForTimeGameTeam, maxTechnicalTimesForGameTeam, maxExclusionsToDisqualification } = literalObject;
            this._id = _id;
            this.quantityNormalTimes = quantityNormalTimes;
            this.quantityExtraTimes = quantityExtraTimes;
            this.normalTime = normalTime;
            this.extraTime = extraTime;
            this.technicalTimesForTimeGameTeam = technicalTimesForTimeGameTeam;
            this.maxTechnicalTimesForGameTeam = maxTechnicalTimesForGameTeam;
            this.maxExclusionsToDisqualification = maxExclusionsToDisqualification;
        } else {
            this._id = '';
            this.quantityNormalTimes = 2;
            this.quantityExtraTimes = 0;
            this.normalTime = 30;
            this.extraTime = 10;
            this.technicalTimesForTimeGameTeam = 2;
            this.maxTechnicalTimesForGameTeam = 3;
            this.maxExclusionsToDisqualification = 3;
        }
    }

    clone() {
        return super.clone(new GameSettings());
    }

}