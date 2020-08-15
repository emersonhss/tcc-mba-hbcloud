import React, { Component } from 'react';
// import { observer, inject } from 'mobx-react';
import Icon from '../../../../layout/Icon';
import Input from '../../../../components/forms/Input';
import BgColorSelect from '../../../../components/forms/BgColorSelect';
// import FabButton from '../../../../layout/FabButton';
import TeamMembers from './TeamMembers';
import TeamGoals from './TeamGoals';
import imgMaximus from '../../../../assets/imgs/maximus_square.png';
import './TeamGame.css';
import TeamWarnings from './TeamWarnings';
import TeamExclusions from './TeamExclusions';
import TeamDisqualifications from './TeamDisqualifications';
import TeamTechnicalTimes from './TeamTechnicalTimes';

export default class TeamGame extends Component {

    constructor(props){
        super(props);

        this.state = {
            showTeamMembers: false,
            showTeamGoals: false,
            showTeamWarnings: false,
            showTeamExclusions: false,
            showTeamDisqualifications: false,
            showTeamTechnicalTimes: false
        };
    }

    _renderShield(team) {
        if(team.shield) {
            return (
                <img className="img-rounded" src={imgMaximus} alt={team.name} />
            );
        }
        return (
            <a role="button"><Icon type="fa" name="shield-alt" size="4" /> <span></span> </a>
        );
    }

    _inputLocality() {
        const {team, teamTag, onChangeFieldTeam} = this.props;
        return (
            <Input type="text" size="small" cols='12'
                placeholder={`Localidade da equipe ${teamTag}`}
                value={team.locality} 
                onChange={(e) => onChangeFieldTeam(teamTag, 'locality', e.target.value)} 
                groupBeforeRender={() => <Icon type="fa" name="map-marker-alt" />} />
        );
    }

    _inputName() {
        const {team, teamTag, onChangeFieldTeam} = this.props;
        
        return (
            <Input type="text" size="small" cols='12'
                placeholder={`Nome da equipe ${teamTag}`}
                value={team.name} 
                onChange={(e) => onChangeFieldTeam(teamTag, 'name', e.target.value)} />
        );
    }

    _renderLinkEditShieldTeam(edit) {
        if(edit) {
            return (
                <a role="button"><Icon type="fa" name="image" /> <span>Alterar</span></a>
            );
        }
        return null;
    }

    _renderColorButton(edit) {
        const {team, teamTag, onChangeFieldTeam} = this.props;
        if(edit) {
            return <BgColorSelect label={`Cor da equipe ${teamTag}`} value={team.color}
                        onChange={(value) => onChangeFieldTeam(teamTag, 'color', value)} />
        }
        return null;
    }

    _renderTeamGameNumbers(edit, icon, label, value, color, onChange, onClick) {
        return (
            <a role="button" onClick={(e) => onClick && onClick()}><Icon type="fa" name={icon} /> <span>{label}</span> <span className={`pull-right badge bg-${color}`}>{value}</span></a>
        );
    }

    render() {
        const {
            team, teamTag, onChangeFieldTeam, classGols, edit, 
            addTeamMember, removeTeamMember, changeFieldValueMember, 
            addTeamGoal, editTeamGoal, removeTeamGoal,
            addTeamWarning, editTeamWarning, removeTeamWarning,
            addTeamExclusion, editTeamExclusion, removeTeamExclusion,
            addTeamDisqualification, editTeamDisqualification, removeTeamDisqualification,
            addTeamTechnicalTime, editTeamTechnicalTime, removeTeamTechnicalTime,
        } = this.props;
        const {showTeamMembers, showTeamGoals, showTeamWarnings, showTeamExclusions, showTeamDisqualifications, showTeamTechnicalTimes} = this.state;
        const bgColorClass = team.color ? `bg-${team.color}` : 'bg-blue';

        return (
            <div className="box box-widget widget-user-2">
                {/* <!-- Add the bg color to the header using any of the bg-* classes --> */}
                <div className={`widget-user-header ${bgColorClass}`}>
                    <div className="btn-group inline">
                        {this._renderLinkEditShieldTeam(edit)}{' '}
                        {this._renderColorButton(edit)}
                    </div>
                    <div className="widget-user-image">
                       {this._renderShield(team)}
                    </div>
                    {/* <!-- /.widget-user-image --> */}
                    <h3 className="widget-user-username">
                        { edit ? this._inputName() : (team.name ? team.name : `Nome da equipe ${teamTag}`)}
                    </h3>
                    <h5 className="widget-user-desc">
                        { edit ? '' : <Icon type="fa" name="map-marker-alt" /> }{' '}
                        { edit ? this._inputLocality() : <span>{team.locality ? team.locality : `Localidade da equipe ${teamTag}` }</span> }
                    </h5>
                </div>
                <div className="box-footer no-padding">
                    <ul className="nav nav-stacked">
                        <li className={classGols}>{this._renderTeamGameNumbers(edit, "futbol", "Gols", team.goals.length, "blue", () => {}, (e) => this.setState({ showTeamGoals: true }))}</li>
                        <li>{this._renderTeamGameNumbers(edit, "tag", "Advertências", team.warnings.length, "yellow", () => {}, (e) => this.setState({ showTeamWarnings: true }))}</li>
                        <li>{this._renderTeamGameNumbers(edit, "clock", "Exclusões", team.exclusions.length, "aqua", (e) => {}, (e) => this.setState({ showTeamExclusions: true }))}</li>
                        <li>{this._renderTeamGameNumbers(edit, "user-slash", "Desqualificações", team.disqualifications.length, "red", (e) => {}, (e) => this.setState({ showTeamDisqualifications: true }))}</li>
                        <li>{this._renderTeamGameNumbers(edit, "stopwatch", "Tempos Técnicos", team.technicalTimes.length, "gray", (e) => {}, (e) => this.setState({ showTeamTechnicalTimes: true }))}</li>
                        <li>{this._renderTeamGameNumbers(edit, "users", "Membros", team.members.length, "black", () => {}, (e) => this.setState({ showTeamMembers: true }))}</li>
                    </ul>
                </div>

                <TeamMembers title={`Membros da equipe ${teamTag}`} teamTag={teamTag} team={team} show={showTeamMembers} 
                    edit={edit}
                    addTeamMember={addTeamMember}
                    removeTeamMember={removeTeamMember}
                    changeFieldValueMember={changeFieldValueMember}
                    onBack={() => this.setState({ showTeamMembers: false })} 
                    onClose={() => this.setState({ showTeamMembers: false })} 
                    />

                <TeamGoals title={`Gols da equipe ${teamTag}`} teamTag={teamTag} team={team} show={showTeamGoals} 
                    edit={edit}
                    addTeamGoal={addTeamGoal}
                    editTeamGoal={editTeamGoal}
                    removeTeamGoal={removeTeamGoal}
                    onBack={() => this.setState({ showTeamGoals: false })} 
                    onClose={() => this.setState({ showTeamGoals: false })} 
                    />

                <TeamWarnings title={`Advertências da equipe ${teamTag}`} teamTag={teamTag} team={team} show={showTeamWarnings} 
                    edit={edit}
                    addTeamWarning={addTeamWarning}
                    editTeamWarning={editTeamWarning}
                    removeTeamWarning={removeTeamWarning}
                    onBack={() => this.setState({ showTeamWarnings: false })} 
                    onClose={() => this.setState({ showTeamWarnings: false })} 
                    />

                <TeamExclusions title={`Exclusões da equipe ${teamTag}`} teamTag={teamTag} team={team} show={showTeamExclusions} 
                    edit={edit}
                    addTeamExclusion={addTeamExclusion}
                    editTeamExclusion={editTeamExclusion}
                    removeTeamExclusion={removeTeamExclusion}
                    onBack={() => this.setState({ showTeamExclusions: false })} 
                    onClose={() => this.setState({ showTeamExclusions: false })}
                    />

                <TeamDisqualifications title={`Desqualificações da equipe ${teamTag}`} teamTag={teamTag} team={team} show={showTeamDisqualifications} 
                    edit={edit}
                    addTeamDisqualification={addTeamDisqualification}
                    editTeamDisqualification={editTeamDisqualification}
                    removeTeamDisqualification={removeTeamDisqualification}
                    onBack={() => this.setState({ showTeamDisqualifications: false })} 
                    onClose={() => this.setState({ showTeamDisqualifications: false })} 
                    />

                <TeamTechnicalTimes title={`Tempos técnicos da equipe ${teamTag}`} teamTag={teamTag} team={team} show={showTeamTechnicalTimes} 
                    edit={edit}
                    addTeamTechnicalTime={addTeamTechnicalTime}
                    editTeamTechnicalTime={editTeamTechnicalTime}
                    removeTeamTechnicalTime={removeTeamTechnicalTime}
                    onBack={() => this.setState({ showTeamTechnicalTimes: false })} 
                    onClose={() => this.setState({ showTeamTechnicalTimes: false })} 
                    />
            </div>
        );
    }
}