import BaseModel from '../../models/BaseModel';

export default class TeamGoal extends BaseModel {

    constructor(literalObject) {
        super();
        if(literalObject) {
            const {_id, time, athlete} = literalObject;
            this._id = _id;
            this.time = time;
            this.athlete = athlete;
            
        } else {
            this._id = undefined;
            this.time = undefined;
            this.athlete = undefined;
        }
    
    clone() {
        return super.clone(new TeamGoal());
    }

}