import TournamentDao from "../daos/TournamentDao";
import ConnectionFactory from "../../../../services/ConnectionFactory";

export default class TournamentService {

    save(tournament) {
        return new Promise(async (resolve, reject) => {
            console.log('TournamentService.save')
            if (tournament._id) {
                console.log('Put Tournament:', tournament);
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
                console.log('Save Tournament:', newTournament);    
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

    listMyRegistrations(user) {
        const myRegistrations = [];
        return new Promise(async (resolve, reject) =>  {
            try {
                const tournaments = await this.listAll();
                console.log('')
                tournaments.forEach(tournament => {
                    const associations = tournament.associations.filter(association => association.userRegistration && association.userRegistration.id === user.id);
                    if(associations.length > 0) {
                        associations.forEach(association => {
                            myRegistrations.push({
                                tournamentId: tournament._id,
                                tournamentName: tournament.name,
                                tournamentImage: tournament.image,
                                tournamentColor: tournament.color,
                                tournamentStatus: tournament.status,
                                associationId: association._id,
                                associationName: association.name,
                                associationImage: association.image,
                                associationColor: association.color,
                                associationStatus: association.status,
                                associationNumberTeams: association.teams.length,
                                dateRegistration: association.dateRegistration
                            });
                        });
                    }
                });
                resolve(myRegistrations);
            } catch(error) {
                reject(error);
            }
        });
    }

}