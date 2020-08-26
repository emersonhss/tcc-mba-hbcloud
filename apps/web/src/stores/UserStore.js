import { observable, computed, action } from "mobx";
import UserSessionService from '../modules/system/users/services/UserSessionService';


export default class UserStore {

    _service = new UserSessionService();

    @observable user = '';
    @observable lastUsers = [];
    @observable errorMessage = '';
    @observable userChecked = false;

    @computed
    get lastUsersLogged() {
        return this.lastUsers.slice();
    }

    @computed
    get errorLoginMessage(){
        return this.errorMessage;
    }

    @action
    async getUserLogged() {
        this.userChecked = true;
        try{
            this.user = await this._service.getUserLogged();
            console.log('Usuário localizado:', this.user);
            this.errorMessage = '';
        } catch(err) {
            this.errorMessage = err;
        }
    }

    @action
    registerLogin(key, password) {
        this._service.registerAuthN(key, password)
            .then(user => {
                this.user = user;
                this.lastUsers.unshift(this.user);
                this.errorMessage = '';
            }).catch(error => {
                console.log(error);
                this.errorMessage = error;
            });
    }

    @action
    registerLogout() {
        this._service.registerLogout()
            .then(message => {
                this.user = null;
                this.errorMessage = message;
            }).catch(error => {
                this.errorMessage = error;
            });
    }

}