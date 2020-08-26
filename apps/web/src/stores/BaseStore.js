import { observable } from "mobx";

export default class BaseStore {

    @observable loading = false;
    @observable messageProcess = '';

}