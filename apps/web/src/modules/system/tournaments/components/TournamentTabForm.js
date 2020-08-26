import React, { Component } from 'react';
import { inject } from 'mobx-react';
import Icon from '../../../../layout/Icon';
import Input from '../../../../components/forms/Input';
import Select from '../../../../components/forms/Select';
import DatePicker from '../../../../components/forms/DatePicker';
import TextArea from '../../../../components/forms/TextArea';
import BoxWidget from '../../../../layout/BoxWidget';
import BgColorSelect from '../../../../components/forms/BgColorSelect';
import TOURNAMENT_STATUS from '../../constants/tournament-status';
import TOURNAMENT_REGISTRATION_STATUS from '../../constants/tournament-registration-status';

@inject("routerStore")
@inject("tournamentStore")
export default class TournamentTabForm extends Component {

    _renderColorButton(edit) {
        const { tournament } = this.props.tournamentStore;
        if(edit) {
            return <BgColorSelect label={`Cor da competição`} value={tournament.color}
                        onChange={(value) => this.props.tournamentStore.updateField('color', value)} />
        }
        return null;
    }


    render() {
        const { tournament, edit } = this.props.tournamentStore;

        return (
            <div className="row">
                <div className="tournament-column-one col-xs-12 col-sm-12 col-md-3">
                    <div className={`tournament-column-one-image ${tournament.color ? `bg-${tournament.color}` : 'bg-blue'}`}>
                        <a href="javascript:;">
                            <span className="">
                                <Icon type="fa" name="trophy" size="5" />
                            </span>
                        </a>
                        {this._renderColorButton(edit)}
                    </div>
                </div>
                <div className="tournament-column-two col-xs-12 col-sm-12 col-md-9">
                    <Input cols="12 6" 
                        id="ipt-tournament-name" 
                        label="Nome da competição" 
                        placeholder="Nome da competição" 
                        disabled={!edit}
                        value={tournament.name}
                        onChange={(e) => this.props.tournamentStore.updateField('name', e.target.value)}
                        onBlur={(e) => this.props.tournamentStore.updateField('name', e.target.value)}  />

                    <Select cols="6" 
                        id="slt-tournament-status" 
                        label="Status" 
                        options={TOURNAMENT_STATUS} 
                        disabled={!edit}
                        value={tournament.status} 
                        onChange={(e) => this.props.tournamentStore.updateField('status', e.target.value)}
                        onBlur={(e) => this.props.tournamentStore.updateField('status', e.target.value)}  />

                    <DatePicker cols='6'
                        id="dtpk-tournament-start-date" 
                        value={tournament.startDate} 
                        label="Início da competição" 
                        placeholder="Início da competição" 
                        disabled={!edit}
                        onChange={(e) => this.props.tournamentStore.updateField('startDate', e.target.value)}
                        onBlur={(e) => this.props.tournamentStore.updateField('startDate', e.target.value)}  />

                    <DatePicker cols='6'
                        id="dtpk-tournament-end-date" 
                        value={tournament.endDate} 
                        label="Fim da competição" 
                        placeholder="Fim da competição" 
                        disabled={!edit}
                        onChange={(e) => this.props.tournamentStore.updateField('endDate', e.target.value)}
                        onBlur={(e) => this.props.tournamentStore.updateField('endDate', e.target.value)}  />

                    <Input type="text" cols='12'
                        label="Localidade da competição"
                        placeholder="Exemplo: João Pessoa, Paraíba, Brasil"
                        value={tournament.locality} 
                        disabled={!edit}
                        onChange={(e) => this.props.tournamentStore.updateField('locality', e.target.value)}
                        onBlur={(e) => this.props.tournamentStore.updateField('locality', e.target.value)}
                        groupBeforeRender={() => <Icon type="fa" name="map-marker-alt" />} />

                    <TextArea cols='12'
                        id="txt-tournament-details" 
                        value={tournament.details} 
                        label="Detalhes" 
                        placeholder="Detalhes da competição" 
                        disabled={!edit}
                        onChange={(e) => this.props.tournamentStore.updateField('details', e.target.value)}
                        onBlur={(e) => this.props.tournamentStore.updateField('details', e.target.value)}  />

                    <BoxWidget id="tournament_inscricoes" title="Inscrições"
                        collapse={true}
                        type="default" cols="12">
                        
                        <Select cols="12 12 4" 
                            id="slct-tournament-registrations" 
                            options={TOURNAMENT_REGISTRATION_STATUS} 
                            disabled={!edit}
                            value={tournament.statusRegistrations} 
                            label="Situação" 
                            size="small" 
                            onChange={(e) => this.props.tournamentStore.updateField('statusRegistrations', e.target.value)}
                            onBlur={(e) => this.props.tournamentStore.updateField('statusRegistrations', e.target.value)}  />

                        <DatePicker cols='12 12 4'
                            id="dtpk-tournament-registration-start-date" 
                            value={tournament.startDateRegistrations} 
                            size="small"
                            label="Início das inscrições" 
                            placeholder="Início das inscrições" 
                            disabled={!edit}
                            onChange={(e) => this.props.tournamentStore.updateField('startDateRegistrations', e.target.value)}
                            onBlur={(e) => this.props.tournamentStore.updateField('startDateRegistrations', e.target.value)}  />

                        <DatePicker cols='12 12 4'
                            id="dtpk-tournament-registration-end-date" 
                            value={tournament.endDateRegistrations} 
                            size="small"
                            label="Fim das inscrições" 
                            placeholder="Fim das inscrições" 
                            disabled={!edit}
                            onChange={(e) => this.props.tournamentStore.updateField('endDateRegistrations', e.target.value)}
                            onBlur={(e) => this.props.tournamentStore.updateField('endDateRegistrations', e.target.value)}  />

                    </BoxWidget>

                    <BoxWidget id="tournament_premiacao" title="Premiação"
                        collapse={true}
                        type="default" cols="12">
                        
                        <Input cols="12 12 4" 
                            id="ipt-tournament-awards-first" 
                            size="small" 
                            label="1º Lugar" 
                            placeholder="1º Lugar" 
                            disabled={!edit}
                            value={tournament.awardsFirst} 
                            onChange={(e) => this.props.tournamentStore.updateField('awardsFirst', e.target.value)}
                            onBlur={(e) => this.props.tournamentStore.updateField('awardsFirst', e.target.value)}  />

                        <Input cols="12 12 4" 
                            id="ipt-tournament-awards-second" 
                            size="small" 
                            label="2º Lugar" 
                            placeholder="2º Lugar" 
                            disabled={!edit}
                            value={tournament.awardsSecond} 
                            onChange={(e) => this.props.tournamentStore.updateField('awardsSecond', e.target.value)}
                            onBlur={(e) => this.props.tournamentStore.updateField('awardsSecond', e.target.value)}  />

                        <Input cols="12 12 4" 
                            id="ipt-tournament-awards-third" 
                            size="small" 
                            label="3º Lugar" 
                            placeholder="3º Lugar" 
                            disabled={!edit}
                            value={tournament.awardsThird} 
                            onChange={(e) => this.props.tournamentStore.updateField('awardsThird', e.target.value)}
                            onBlur={(e) => this.props.tournamentStore.updateField('awardsThird', e.target.value)}  />

                    </BoxWidget>
                
                </div>
            
            </div>    
        );
    }
}
