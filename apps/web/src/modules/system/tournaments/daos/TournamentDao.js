import Tournament from '../models/Tournament';

export default class TournamentDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'tournaments';
    }

    save(tournament) {

        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(tournament);

            request.onsuccess = e => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a competição.');

            };

        });
    }

    update(tournament) {

        return new Promise((resolve, reject) => {
            
            let objectStore = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store);

            let request = objectStore.get(tournament._id);

            request.onsuccess = e => {

                const tournamentGetted = request.result;
                console.log('Localizada competição:', tournamentGetted);

                let updateRequest = objectStore.put(tournament);

                updateRequest.onsuccess = (e) => {
                    console.log('Competição atualizada:', tournament);
                    resolve(tournament);
                };

            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a competição.');

            };

        });
    }

    listAll() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let tournament = [];

            cursor.onsuccess = e => {

                let atual = e.target.result;

                if(atual) {

                    let dado = atual.value;
                    
                    tournament.push(new Tournament({ ...dado }));

                    atual.continue();

                } else {

                    resolve(tournament);
                }

            };

            cursor.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível listar as competições.');
            };

        });
    }

    get(idTournament) {
        console.log('idTournament', typeof(idTournament), idTournament);

        return new Promise((resolve, reject) => {
            let objectStore = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore(this._store);

            let request = objectStore.get(parseInt(idTournament));

            request.onsuccess = e => {
                const tournamentGetted = request.result;
                if (tournamentGetted) {
                    console.log('Localizada competição ' + idTournament, tournamentGetted);
                    resolve(new Tournament({ ...tournamentGetted }));
                } else {
                    reject('Não foi possível recuperar a competição ' + idTournament);    
                }
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível recuperar a competição ' + idTournament);
            };
        });
    }

    removeAll() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Competições apagadas com sucesso');

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar as competições');
            }; 

        });

    }
}