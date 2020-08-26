import GameDao from "../daos/GameDao";
import ConnectionFactory from "../../../../services/ConnectionFactory";

export default class GameService {

    save(game) {
        return new Promise(async (resolve, reject) => {
            console.log('GameService.save')
            if (game._id) {
                ConnectionFactory.getConnection()
                    .then(connection => new GameDao(connection))
                    .then(dao => dao.update(game))
                    .then((game) => resolve(game))
                    .catch(error => {
                        console.log(error);
                        reject('Não foi possível atualizar a partida.');
                    });
            } else {
                let allGames = null;
                let newId = 1;
                try {
                    allGames = null;
                    const connection = await ConnectionFactory.getConnection();
                    const dao = new GameDao(connection)
                    allGames = await dao.listAll();
                    newId = allGames ? allGames.length + 1 : 1;
                } catch (error) {
                    console.log(error);
                }
                const newGame = game.clone();
                newGame._id = newId;
    
                ConnectionFactory.getConnection()
                    .then(connection => new GameDao(connection))
                    .then(dao => dao.save(newGame))
                    .then(() => resolve(newGame))
                    .catch(error => {
                        console.log(error);
                        reject('Não foi possível salvar a partida.');
                    });
            }
        });
    }

    listAll() {
        return new Promise(async (resolve, reject) => {
            console.log('GameService.listAll')
            ConnectionFactory.getConnection()
                .then(connection => new GameDao(connection))
                .then(dao => dao.listAll())
                .then((list) => resolve(list))
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível listar as partidas.');
                });
        });
    }

    get(idGame) {
        return new Promise(async (resolve, reject) => {
            console.log('GameService.get')
            ConnectionFactory.getConnection()
                .then(connection => new GameDao(connection))
                .then(dao => dao.get(idGame))
                .then((game) => resolve(game))
                .catch(error => {
                    console.log(error);
                    reject(`Não foi possível localizar a partida de id ${idGame}.`);
                });
        });
    }

}