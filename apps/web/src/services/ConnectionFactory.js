const stores = ['user', 'games', 'tournaments'];
const version = 6;
const dbName = 'handball.cloud';

let connection = null;

let close = null;

export default class ConnectionFactory {

    constructor() {

        throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    static getConnection() {
        
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {

                ConnectionFactory._createStores(e.target.result);

            };

            openRequest.onsuccess = e => {

                if(!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function() {
                        throw new Error('Você não pode fechar diretamente a conexão');
                    };
                }
                resolve(connection);

            };

            openRequest.onerror = e => {

                console.log(e.target.error);

                reject(e.target.error.name);
            };

        });
    }

    static _createStores(connection) {

        stores.forEach(store => {

            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }

            if ( store === 'user') {
                let objectStore = connection.createObjectStore(store, { keyPath: 'email' });
            } 
        
            if (store === 'games' || store === 'tournaments') {
                let objectStore = connection.createObjectStore(store, { keyPath: '_id' });
            }

        });

    }

    static closeConnection() {

        if(connection) {
            close();
            connection = null;
            close = null;
        }
    }
}