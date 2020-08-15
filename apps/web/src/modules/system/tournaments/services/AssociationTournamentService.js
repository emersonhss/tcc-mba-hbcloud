import TournamentDao from "../daos/TournamentDao";
import ConnectionFactory from "../../../../services/ConnectionFactory";

export default class TournamentService {

    save(tournament) {
        return new Promise(async (resolve, reject) => {
            console.log('TournamentService.save')
            if (tournament._id) {
                ConnectionFactory.getConnection()
                    .then(connection => new TournamentDao(connection))
                    .then(dao => dao.update(tournament))
                    .then((tournament) => resolve(tournament))
                    .catch(error => {
                        console.log(error);
                        reject('Não foi possível atualizar a competição.');
                    });
            } else {
                let allTournaments = null;
                let newId = 1;
                try {
                    allTournaments = null;
                    const connection = await ConnectionFactory.getConnection();
                    const dao = new TournamentDao(connection)
                    allTournaments = await dao.listAll();
                    newId = allTournaments ? allTournaments.length + 1 : 1;
                } catch (error) {
                    console.log(error);
                }
                const newTournament = tournament.clone();
                newTournament._id = newId;
    
                ConnectionFactory.getConnection()
                    .then(connection => new TournamentDao(connection))
                    .then(dao => dao.save(newTournament))
                    .then(() => resolve(newTournament))
                    .catch(error => {
                        console.log(error);
                        reject('Não foi possível salvar a competição.');
                    });
            }
        });
    }

    listAll() {
        return new Promise(async (resolve, reject) => {
            console.log('TournamentService.listAll')
            ConnectionFactory.getConnection()
                .then(connection => new TournamentDao(connection))
                .then(dao => dao.listAll())
                .then((list) => resolve(list))
                .catch(error => {
                    console.log(error);
                    reject('Não foi possível listar as competições.');
                });
        });
    }

    get(idTournament) {
        return new Promise(async (resolve, reject) => {
            console.log('TournamentService.get')
            ConnectionFactory.getConnection()
                .then(connection => new TournamentDao(connection))
                .then(dao => dao.get(idTournament))
                .then((tournament) => resolve(tournament))
                .catch(error => {
                    console.log(error);
                    reject(`Não foi possível localizar a competição de id ${idTournament}.`);
                });
        });
    }

}