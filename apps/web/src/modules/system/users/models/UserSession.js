export default class UserSession {

    constructor(id, name, email, lastAccess = Date.now()){
        this.id = id;
        this.name = name;
        this.email = email;
        this.lastAccess = lastAccess;
    }

}