// import {HttpService} from './HttpService';
import ConnectionFactory from '../../../../services/ConnectionFactory';
import UserSessionDao from '../daos/UserSessionDao';
import UserSession from '../models/UserSession';

export default class UserSessionService {
    
    registerAuthN(username, password) {

        return new Promise((resolve, reject) => {
            if(!username || username !== 'emerson@email.com' || !password || password !== '12345ok') {
                reject('Usuário ou senha inválidos!');
            } else {
                let user = new UserSession(1, 'Emerson Henrique', 'emerson@email.com');
                ConnectionFactory.getConnection()
                .then(connection => new UserSessionDao(connection))
                .then(dao => dao.save(user))
                .then(() => resolve(user))
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível registrar o login do usuário.');
                });
            }
        });
    }

    getUserLogged() {
        return  ConnectionFactory.getConnection()
                    .then(connection => new UserSessionDao(connection))
                    .then(dao => dao.get());
    }

    registerLogout() {
        return  ConnectionFactory.getConnection()
                    .then(connection => new UserSessionDao(connection))
                    .then(dao => dao.clearUser());
    }

}