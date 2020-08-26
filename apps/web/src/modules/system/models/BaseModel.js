
export default class BaseModel {

    constructor() {
        if (new.target === BaseModel) {
          throw new TypeError("Cannot construct BaseModel instances directly");
        }
    }

    clone(newInstance) {
        let obj = this;        
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) newInstance[attr] = obj[attr];
        }
        return newInstance;
    }

}