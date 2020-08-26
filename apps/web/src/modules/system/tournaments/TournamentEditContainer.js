import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
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
import TournamentTabForm from './components/TournamentTabForm';
import CategoriesTabForm from './components/CategoriesTabForm';
import RegistrationsTabForm from './components/RegistrationsTabForm';

const BASE_URI = '/app/competicoes';

const getBreadCrumb = (title) => {
    return [
        {
            link: '/',
            title: 'Início'
        },
        {
            link: '/competicoes',
            title: 'Competições'
        },
        {
            title,
            active: true
        }
      ];
}

@inject("routerStore")
@inject("tournamentStore")
@observer
export default class TournamentEditContainer extends Component {

    
    constructor(props){
        super(props);
        
        this.state = {
            viewTournamentId: undefined,
            viewType: undefined,
            showSettings: false,
        };
    }

    componentDidMount() {
        console.log('Montando tela de competição...');
        const { viewTournamentId, viewType } = this.state;
        const { id, view } = this.props.match.params;
        const newState = {...this.state};

        let hasChange = false;
        if (viewTournamentId !== id) {
            newState.viewTournamentId = id;
            hasChange = true;
        } 

        if (viewType !== view) {
            newState.viewType = view;
            hasChange = true;
        } 
        
        if (hasChange) {
            this.setState(newState);
        } 
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { id } = nextProps.match.params;
        const { viewTournamentId, viewType } = this.state;
        if (viewTournamentId !== nextState.viewTournamentId || viewType !== nextState.viewType) {
            // Significa mudança de view.
            console.log('Mudança de estado...');
            this._init(nextState);
            window.scrollTo(0, 0);
        }

        if (viewTournamentId !== id) {
            this.setState({ viewTournamentId: id });
        }

        return true;
    }

    _init(newState) {
        const { viewTournamentId, viewType } = newState;
        console.log('Abrindo tela de competição no modo:', viewType);
        if (viewTournamentId && viewTournamentId !== 'nova') {
            if(viewType === 'edit') {
                console.log('Editar competição...', viewTournamentId);
                this.props.tournamentStore.editTournament(viewTournamentId);
            } else {
                console.log('Ver competição...', viewTournamentId);
                this.props.tournamentStore.viewTournament(viewTournamentId);
            }
        } else {
            console.log('Criar nova competição...');
            this.props.tournamentStore.newTournament();
        } 
    }

    async _saveTournament() {
        if( await this.props.tournamentStore.saveTournament()) {
            console.log('Redirencionando para view');
            this.props.history.push(`${BASE_URI}/${this.props.tournamentStore.tournament._id}`);
            this.setState({ viewType: undefined, viewTournamentId: this.props.tournamentStore.tournament._id, showExecuteGame: false });
        }
    }

    _editTournament() {
        this.props.history.push(`${BASE_URI}/${this.state.viewTournamentId}/edit`);
        this.setState({ viewType: 'edit' });
    }

    _cancel() {
        this.props.history.push(BASE_URI);
    }

    _renderButtons() {
        if (!this.props.tournamentStore.edit) {
            return (
                <div className="form-group-buttons">
                    <div className="buttons-left">
                        <button type="button" className="btn btn-default" onClick={() => this._cancel()}>Cancelar</button>
                    </div>

                    <div className="buttons-right">
                        <button type="button" className="btn btn-primary" onClick={() => this._editTournament()}><Icon type="fa" name="edit" /> Editar</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="form-group-buttons">
                    <div className="buttons-left">
                        <button type="button" className="btn btn-default" onClick={() => this._cancel()}>Cancelar</button>
                    </div>

                    <div className="buttons-right">
                        <button type="button" className="btn btn-primary" onClick={() => this._saveTournament()}><Icon type="fa" name="check" /> Salvar</button>
                    </div>
                </div>
            );
        }
    }

    render() {
        const { viewType, viewTournamentId, showSettings } = this.state;
        console.log('View:', viewType, viewTournamentId);
        if (!viewType && !viewTournamentId) {
            return <TransictionPage />;
        }

        const { tournament, edit, message } = this.props.tournamentStore;
        const titlePage = edit ? (tournament._id ? 'Editar Competição' : 'Nova Competição') : 'Detalhes da Competição';
        const subTitlePage = edit ? (tournament._id ? 'Edite a competição.' : 'Cadastre uma nova competição.') : 'Ver detalhes da competição';
        
        return (
            <Content title={titlePage} subtitle={subTitlePage} breadCrumb={<BreadCrumb arrayModel={getBreadCrumb(titlePage)} />} >
                <Alert visible={message} type={message ? message.type :  ''} text={message ? message.text :  ''} />

                <NavTabs onSettings={() => this.setState({ showSettings: true })}>
                    <NavTabItem active={true} tabName={'competicao'} label="Competição">
                        <TournamentTabForm /> 
                    </NavTabItem>
                    <NavTabItem active={false} tabName={'categorias'} label="Categorias">
                        <CategoriesTabForm />                        
                    </NavTabItem>
                    <NavTabItem active={false} tabName={'inscricoes'} label="Inscrições">
                        <RegistrationsTabForm />
                    </NavTabItem>
                    <NavTabItem active={false} tabName={'tabela'} label="Tabela">
                        Apresentar a tabela de partidas da competição para cada categoria.
                    </NavTabItem>
                    <NavTabItem active={false} tabName={'classificacoes'} label="Classificações">
                        Apresentar a classificação da competição para as diversas categorias.
                    </NavTabItem>
                    <NavTabItem active={false} tabName={'administracao'} label="Administração">
                        Escolher ou convidar usuários para ajudar na administração da competição.
                    </NavTabItem>
                </NavTabs>
                <div className="row">
                    <div className="col-md-12">
                        {this._renderButtons()}
                    </div>
                </div>

            </Content>
        );
    }
}