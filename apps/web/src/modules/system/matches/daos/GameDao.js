import Game from '../models/Game';

export default class GameDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'games';
    }

    save(game) {

        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(game);

            request.onsuccess = e => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a partida');

            };

        });
    }

    update(game) {

        return new Promise((resolve, reject) => {
            
            let objectStore = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store);

            let request = objectStore.get(game._id);

            request.onsuccess = e => {

                const gameGetted = request.result;
                console.log('Localizada partida:', gameGetted);

                let updateRequest = objectStore.put(game);

                updateRequest.onsuccess = (e) => {
                    console.log('Partida atualizada:', game);
                    resolve(game);
                };

            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a partida');

            };

        });
    }

    listAll() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let games = [];

            cursor.onsuccess = e => {

                let atual = e.target.result;

                if(atual) {

                    let dado = atual.value;
                    
                    games.push(new Game({ ...dado }));

                    atual.continue();

                } else {

                    resolve(games);
                }

            };

            cursor.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível listar as partidas');
            };

        });
    }

    get(idGame) {
        console.log('idGame', typeof(idGame), idGame);

        return new Promise((resolve, reject) => {
            let objectStore = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore(this._store);

            let request = objectStore.get(parseInt(idGame));

            request.onsuccess = e => {
                const gameGetted = request.result;
                if (gameGetted) {
                    console.log('Localizada partida ' + idGame, gameGetted);
                    resolve(new Game({ ...gameGetted }));
                } else {
                    reject('Não foi possível recuperar a partida ' + idGame);    
                }
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível recuperar a partida ' + idGame);
            };
        });
    }

    removeAll() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Partidas apagadas com sucesso');

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar as partidas');
            }; 

        });

    }
}