import BaseModel from "../../models/BaseModel";

export default class Association extends BaseModel {

    constructor(literalObject) {
        super();
        if(literalObject) {
            const {_id, name, image, color, status, locality, teams, dateRegistration, userRegistration, dateLastUpdate} = literalObject;
            this._id = _id;
            this.name = name;
            this.image = image;
            this.color = color;
            this.status = status;
            this.locality = locality;
            this.teams = teams ? [].concat(teams.slice()) : [];
            this.dateRegistration = dateRegistration;
            this.userRegistration = userRegistration;
            this.dateLastUpdate = dateLastUpdate;
        } else {

            this._id = '';
            this.name = '';
            this.image = '';
            this.color = '';
            this.status = '';
            this.locality = '';
            this.teams = [];
            this.dateRegistration = '';
            this.userRegistration = '';
            this.dateLastUpdate = '';
        }
    }

    clone() {
        return super.clone(new Association());
    }

}