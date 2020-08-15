import { RouterStore } from 'mobx-react-router';
import UserStore from './UserStore';
import GameStore from '../modules/system/matches/stores/GameStore';
import TournamentStore from '../modules/system/tournaments/stores/TournamentStore';
import TournamentRegistrationStore from '../modules/system/tournaments/stores/TournamentRegistrationStore';

class RootStores {
    
    constructor() {
        this.userStore = new UserStore();
        this.routerStore = new RouterStore();
        this.gameStore = new GameStore();
        this.tournamentStore = new TournamentStore();
        this.tournamentRegistrationStore = new TournamentRegistrationStore();
    }

}

export default new RootStores();