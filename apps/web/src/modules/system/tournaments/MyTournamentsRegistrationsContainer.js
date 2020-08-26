import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link }from 'react-router-dom';
import Content from '../../../layout/Content';
import BreadCrumb from '../../../layout/BreadCrumb';
import BoxWidget from '../../../layout/BoxWidget';
import Alert from '../../../components/Alert';
import DatePicker from '../../../components/forms/DatePicker';
import Input from '../../../components/forms/Input';
import Select from '../../../components/forms/Select';
import Icon from '../../../layout/Icon';
import NavTabs, { NavTabItem } from '../../../components/NavTabs';
import TransictionPage from '../../../components/TransictionPage';
import SUITS, { getSuitLabel } from '../constants/suits';
import CATEGORIES, { getCategoryLabel } from '../constants/categories';
import TOURNAMENT_STATUS from '../constants/tournament-status';
import TextArea from '../../../components/forms/TextArea';
import TOURNAMENT_REGISTRATION_STATUS from '../constants/tournament-registration-status';
import BgColorSelect from '../../../components/forms/BgColorSelect';
import './TournamentEditContainer.css';
import { getStatusRegistrationLabel } from '../constants/tournament-registration-association-status';

const BASE_URI = '/app/competicoes';

const getBreadCrumb = (title) => {
    return [
        {
            link: '/',
            title: 'Início'
        },
        {
            link: '/app/competicoes',
            title: 'Competições'
        },
        {
            title,
            active: true
        }
      ];
}

@inject("routerStore")
@inject("userStore")
@inject("tournamentStore")
@inject("tournamentRegistrationStore")
@observer
export default class MyTournamentsRegistrationsContainer extends Component {

    
    constructor(props){
        super(props);
        
        this.state = {
            viewTournamentId: undefined,
            viewType: undefined,
            showSettings: false,
            cropperOpen: false,
            categoryEdit: {},
        };

    }

    componentDidMount() {
        console.log('Montando tela de competição...');
        this.props.tournamentStore.listMyRegistrations(this.props.userStore.user);
    }

    _cancel() {
        this.props.history.push(BASE_URI);
    }

    _renderButtons() {
        if (!this.props.tournamentRegistrationStore.edit) {
            return (
                <div className="form-group-buttons">
                    <div className="buttons-left">
                        <button type="button" className="btn btn-default" onClick={() => this._cancel()}>Cancelar</button>
                    </div>

                    {/* <div className="buttons-right">
                        <button type="button" className="btn btn-primary" onClick={() => this._editTournament()}><Icon type="fa" name="edit" /> Editar</button>
                    </div> */}
                </div>
            );
        } else {
            return (
                <div className="form-group-buttons">
                    <div className="buttons-left">
                        <button type="button" className="btn btn-default" onClick={() => this._cancel()}>Cancelar</button>
                    </div>

                    {/* <div className="buttons-right">
                        <button type="button" className="btn btn-primary" onClick={() => this._saveTournamentRegistration()}><Icon type="fa" name="check" /> Salvar</button>
                    </div> */}
                </div>
            );
        }
    }

    _renderRegistrations(index, myRegistration) {
        return (
            <tr key={`myRegistration_${index}`}>
                <td>{index + 1}.</td>
                <td>{myRegistration.tournamentName}</td>
                <td>{myRegistration.associationName}</td>
                <td>{myRegistration.associationNumberTeams}</td>
                <td>{myRegistration.dateRegistration}</td>
                <td>{getStatusRegistrationLabel(myRegistration.associationStatus)}</td>
                <td>
                    <Link to={`/app/competicoes/${myRegistration.tournamentId}/inscricao/${myRegistration.associationId}/edit`}
                        title={`Editar a inscrição da agremiação ${myRegistration.associationName} na competição ${myRegistration.tournamentName}`} 
                        alt={`Editar a inscrição da agremiação ${myRegistration.associationName} na competição ${myRegistration.tournamentName}`}  
                        replace={true}>
                        <Icon type="fa" name="edit" />
                    </Link>
                </td>
                <td>
                    <Link to={`/app/competicoes/${myRegistration.tournamentId}/inscricao/${myRegistration.associationId}`}
                        title={`Ver a inscrição da agremiação ${myRegistration.associationName} na competição ${myRegistration.tournamentName}`} 
                        alt={`Ver a inscrição da agremiação ${myRegistration.associationName} na competição ${myRegistration.tournamentName}`}  
                        replace={true}>
                        <Icon type="fa" name="eye" />
                    </Link>
                </td>
            </tr>
        );
    }

    render() {
        const { myRegistrations, message } = this.props.tournamentStore;
        const edit = true;
        const titlePage = 'Minhas Inscrições';
        const subTitlePage = `Inscrições nas diversas competições`;
        
        return (
            <Content title={titlePage} subtitle={subTitlePage} breadCrumb={<BreadCrumb arrayModel={getBreadCrumb(titlePage)} />} >
                <Alert visible={message} type={message ? message.type :  ''} text={message ? message.text :  ''} />

                <div className="row">
                    <BoxWidget title={`Competições`} cols="12">

                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box-body no-padding table-responsive ">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th style={{width: 10}}>#</th>
                                                <th>Competição</th>
                                                <th>Agremiação</th>
                                                <th>Equipes</th>
                                                <th>Data</th>
                                                <th>Situação</th>
                                                {edit ? <th style={{width: 10}} colSpan="2">Ações</th> : null }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myRegistrations && myRegistrations.length > 0 ? 
                                                myRegistrations.map((myRegistration, index) => this._renderRegistrations(index, myRegistration))
                                                :
                                                <tr><td colSpan="8">Nenhuma equipe inscrita.</td></tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    
                    </BoxWidget>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {this._renderButtons()}
                    </div>
                </div>

            </Content>
        );
    }
}