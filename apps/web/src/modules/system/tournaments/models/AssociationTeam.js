import BaseModel from "../../models/BaseModel";

export default class AssociationTeam extends BaseModel {

    constructor(literalObject) {
        super();
        if(literalObject) {
            const {_id, name, image, color, status, association, category, members} = literalObject;
            this._id = _id;
            this.name = name;
            this.image = image;
            this.color = color;
            this.status = status;
            this.association = association ? 
            { 
                _id: association._id, 
                name: association.name, 
                image: association.image, 
                color: association.color
            } : null;
            this.category = category;
            this.members = members ? [].concat(members.slice()) : [];
        } else {
            this._id = '';
            this.name = '';
            this.image = '';
            this.color = '';
            this.status = '';
            this.association = {};
            this.category = '';
            this.members = [];
        }
    }

    clone() {
        return super.clone(new AssociationTeam());
    }

}