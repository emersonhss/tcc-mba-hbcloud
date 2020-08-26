import React, { Component } from 'react';
import HCModal from '../../../../components/HCModal';
import Input from '../../../../components/forms/Input';
import './GameSettings.css';


export default class GameSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
           _id: '',
           quantityNormalTimes: 2,
           quantityExtraTimes: 0,
           normalTime: 30,
           extraTime: 10,
           technicalTimesForTimeGameTeam: 2,
           maxTechnicalTimesForGameTeam: 2,
        }
    }

    render() {
        const { title, show, edit, onBack, onClose, settings, onChangeSettingsField} = this.props;

        return (
            <HCModal title={title} show={show} onBack={onBack} onClose={onClose} footerComponent={() => null}>

                <div className="row">
                    <Input label="Quantidade de tempos normais" type="number" cols={'12 6'}
                        disabled={!edit}
                        value={settings.quantityNormalTimes} 
                        onChange={event => onChangeSettingsField('quantityNormalTimes', event.target.value ? parseInt(event.target.value) : '')}
                        onBlur={event => onChangeSettingsField('quantityNormalTimes', event.target.value ? parseInt(event.target.value) : 2)} />

                    <Input label="Minutos tempo normal" type="number" cols={'12 6'}
                        disabled={!edit}
                        value={settings.normalTime} 
                        onChange={event => onChangeSettingsField('normalTime', event.target.value ? parseInt(event.target.value) : '')} 
                        onBlur={event => onChangeSettingsField('normalTime', event.target.value ? parseInt(event.target.value) : 30)}/>
                        
                    <Input label="Quantidade de tempos extras" type="number" cols={'12 6'}
                        disabled={!edit}
                        value={settings.quantityExtraTimes} 
                        onChange={event => onChangeSettingsField('quantityExtraTimes', event.target.value ? parseInt(event.target.value) : '')}
                        onBlur={event => onChangeSettingsField('quantityExtraTimes', event.target.value ? parseInt(event.target.value) : 0)}  />

                    <Input label="Minutos tempo extra" type="number" cols={'12 6'}
                        disabled={!edit || !settings.quantityExtraTimes}
                        value={settings.extraTime} 
                        onChange={event => onChangeSettingsField('extraTime', event.target.value ? parseInt(event.target.value) : '')}
                        onBlur={event => onChangeSettingsField('extraTime', event.target.value ? parseInt(event.target.value) : 10)} />
                </div>
                <div className="row">
                    <Input label="Máximo de tempos técnicos na partida por equipe" type="number" cols={'12 6 4'}
                        disabled={!edit}
                        value={settings.maxTechnicalTimesForGameTeam} 
                        onChange={event => onChangeSettingsField('maxTechnicalTimesForGameTeam', event.target.value ? parseInt(event.target.value) : '')} 
                        onBlur={event => onChangeSettingsField('maxTechnicalTimesForGameTeam', event.target.value ? parseInt(event.target.value) : 3)} />

                    <Input label="Máximo de tempos técnicos por período por equipe" type="number" cols={'12 6 4'}
                        disabled={!edit}
                        value={settings.technicalTimesForTimeGameTeam} 
                        onChange={event => onChangeSettingsField('technicalTimesForTimeGameTeam', event.target.value ? parseInt(event.target.value) : '')}
                        onBlur={event => onChangeSettingsField('technicalTimesForTimeGameTeam', event.target.value ? parseInt(event.target.value) : 2)} />

                    <Input label="Máximo de exlusões para desqualificação" type="number" cols={'12 6 4'}
                        disabled={!edit}
                        value={settings.maxExclusionsToDisqualification} 
                        onChange={event => onChangeSettingsField('maxExclusionsToDisqualification', event.target.value ? parseInt(event.target.value) : '')} 
                        onBlur={event => onChangeSettingsField('maxExclusionsToDisqualification', event.target.value ? parseInt(event.target.value) : 3)} />
                </div>
               
            </HCModal>
        )
    }

}
