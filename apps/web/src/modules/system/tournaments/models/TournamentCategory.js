import BaseModel from "../../models/BaseModel";

export default class TournamentCategory extends BaseModel {

    constructor(literalObject) {
        super();
        if(literalObject) {
            const {_id, suit, category } = literalObject;
            this._id = _id;
            this.suit = suit;
            this.category = category;
        } else {
            this._id = '';
            this.suit = '';
            this.category = '';
        }
    }

    clone() {
        return super.clone(new TournamentCategory());
    }

}