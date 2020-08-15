import UserSession from '../models/UserSession';

export default class UserSessionDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'user';
    }

    async save(user) {

        await this.clearUser();

        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(user);

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível salvar o usuário da seção.');

            };

        });
    }

    get() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let user = null;

            cursor.onsuccess = e => {

                let atual = e.target.result;

                if(atual && null === user) {

                    let dado = atual.value;

                    user = new UserSession(dado.id, dado.name, dado.email, dado.lastAccess);

                    atual.continue();

                } else {
                    resolve(user);
                }

            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível obter o usuário da seção.');
            };

        });
    }

    clearUser() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Seção encerrada com sucesso!');

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar usuário da seção.');
            }; 

        });

    }
}