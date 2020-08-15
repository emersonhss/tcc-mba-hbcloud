import BaseModel from "../../models/BaseModel";
import TournamentSettings from "./TournamentSettings;";

export default class Tournament extends BaseModel {

    constructor(literalObject) {
        super();
        if(literalObject) {
            const {_id, name, image, color, status, startDate, endDate, details, locality, 
                statusRegistrations, startDateRegistrations, endDateRegistrations, 
                awardsFirst, awardsSecond, awardsThird, categories, settings, associations} = literalObject;
            this._id = _id;
            this.name = name;
            this.image = image;
            this.color = color;
            this.status = status;
            this.startDate = startDate;
            this.endDate = endDate;
            this.details = details;
            this.locality = locality;
            this.statusRegistrations = statusRegistrations;
            this.startDateRegistrations = startDateRegistrations;
            this.endDateRegistrations = endDateRegistrations;
            this.awardsFirst = awardsFirst;
            this.awardsSecond = awardsSecond;
            this.awardsThird = awardsThird;
            this.categories = categories ? [].concat(categories) : [];
            this.settings = new TournamentSettings({...settings});
            this.associations = associations ? [].concat(associations) : [];
        } else {
            this._id = '';
            this.name = '';
            this.image = '';
            this.color = '';
            this.status = '';
            this.startDate = '';
            this.endDate = '';
            this.details = '';
            this.locality = '';
            this.statusRegistrations = '';
            this.startDateRegistrations = '';
            this.endDateRegistrations = '';
            this.awardsFirst = '';
            this.awardsSecond = '';
            this.awardsThird = '';
            this.categories = [];
            this.settings = new TournamentSettings();
            this.associations = [];
        }
    }

    clone() {
        return super.clone(new Tournament());
    }

}