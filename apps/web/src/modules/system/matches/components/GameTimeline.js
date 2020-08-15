import React, { Component } from 'react';
import { FIRST_TIME, SECOND_TIME, OVERTIME_ONE, OVERTIME_TWO } from '../../constants/match-times';
import Icon from '../../../../layout/Icon';
import './GameTimeline.css';

export default class GameTimeline extends Component {

    _getIconByField(field) {
        switch(field){
            case 'goals':
                return 'futbol';
            case 'warnings':
                return 'tag';
            case 'exclusions':
                return 'clock';
            case 'disqualifications':
                return 'user-slash';
            case 'technicalTimes':
                return 'stopwatch';
            default:
                return '';
        }
    }

    _getColorByField(field) {
        switch(field){
            case 'goals':
                return 'black';
            case 'warnings':
                return 'yellow';
            case 'exclusions':
                return 'aqua';
            case 'disqualifications':
                return 'red';
            case 'technicalTimes':
                return 'gray';
            default:
                return '';
        }
    }

    _getTextByFieldTimeline(field, fieldNumber) {
        switch (field) {
            case 'goals':
                return `marcou o gol ${fieldNumber} da sua equipe!`;
            case 'warnings':
                return `recebeu a advertência ${fieldNumber} da sua equipe!`;
            case 'exclusions':
                return `recebeu a exclusão ${fieldNumber} da sua equipe!`;
            case 'disqualifications':
                return `recebeu a desqualificação ${fieldNumber} da sua equipe!`;
            case 'technicalTimes':
                return `pediu o tempo técnico ${fieldNumber} da sua equipe!`;
            default: 
                return '';
        }
    }

    _renderTimelineItem(index, timelineItem) {
        const { edit, onEditTimelineItem, onRemoveTimelineItem } = this.props;
        return (
            <li key={`timeline_${FIRST_TIME.value}_${index}`}>
                <Icon type="fa" name={this._getIconByField(timelineItem.field)} className={`bg-${this._getColorByField(timelineItem.field)}`} />

                <div className="timeline-item">
                    <span className="time"><Icon type="fa" name="clock" /> {timelineItem.time}</span>
                    
                    <h3 className="timeline-header">
                        <span style={{ padding: 5, borderRadius: 4, color: 'white' }} className={`${timelineItem.team.color ? 'bg-'+timelineItem.team.color : 'bg-blue'}`} >
                        <Icon type="fa" name="shield-alt" /></span>{' '}<a href="#">{timelineItem.team.name}</a>
                    </h3>

                    <div className="timeline-body">
                        {timelineItem.member.name ? `${timelineItem.member.name}${timelineItem.member.tshirt ? ' (camisa ' + timelineItem.member.tshirt + ')' : ''}` : 'Membro não registrado'}
                        {` `}{this._getTextByFieldTimeline(timelineItem.field, timelineItem.number)}
                    </div>

                    {edit ? 
                    <div className="timeline-footer">
                        {onEditTimelineItem ? 
                        <a className="btn btn-default btn-xs" onClick={() => { 
                            onEditTimelineItem(timelineItem.team.tag, timelineItem.field, timelineItem.number - 1, { matchTime: timelineItem.matchTime, time: timelineItem.time, athlete: timelineItem.member }) 
                        }}>
                            <Icon type="fa" name="pen" /> Editar
                        </a> 
                        : null}{` `}
                        {onRemoveTimelineItem ? 
                        <a className="btn btn-danger btn-xs" onClick={() => {
                            onRemoveTimelineItem(timelineItem.team.tag, timelineItem.field, { matchTime: timelineItem.matchTime, time: timelineItem.time, athlete: timelineItem.member });
                        }}>
                            <Icon type="fa" name="trash" /> Excluir
                        </a>
                        : null}
                    </div>
                    : null}
                </div>
            </li>
        );
    }

    _filterTimelineItemTeamField(timelineItem) {
        const { team, field } = this.props;
        if (team && field) {
            return timelineItem.team.name === team.name && timelineItem.field === field;
        }
        return true;
    }

    render() {
        const gameTimeline = this.props.gameTimeline.sort((itemA, itemB) => itemA.time > itemB.time ? 1 : (itemA.time < itemB.time ? -1 : 0));
        const gameTimelineFistTime = gameTimeline.filter(timelineItem => timelineItem.matchTime === FIRST_TIME.value && this._filterTimelineItemTeamField(timelineItem));
        const gameTimelineSecondTime = gameTimeline.filter(timelineItem => timelineItem.matchTime === SECOND_TIME.value && this._filterTimelineItemTeamField(timelineItem));
        const gameTimelineOvertimeOne = gameTimeline.filter(timelineItem => timelineItem.matchTime === OVERTIME_ONE.value && this._filterTimelineItemTeamField(timelineItem));
        const gameTimelineOvertimeTwo = gameTimeline.filter(timelineItem => timelineItem.matchTime === OVERTIME_TWO.value && this._filterTimelineItemTeamField(timelineItem));
        return (
            <div className="timeline-block">
                <ul className="timeline">
                    <li className="time-label">
                        <span className="bg-gray">
                            1º Tempo
                        </span>
                    </li>
                    {gameTimelineFistTime.map((timelineItem, index) => this._renderTimelineItem(index, timelineItem))}
                    
                    <li className="time-label">
                        <span className="bg-gray">
                            2º Tempo
                        </span>
                    </li>
                    {gameTimelineSecondTime.map((timelineItem, index) => this._renderTimelineItem(index, timelineItem))}

                    {gameTimelineOvertimeOne.length > 0 ? 
                    <li className="time-label">
                        <span className="bg-gray">
                            1º Tempo da Prorrogação
                        </span>
                    </li> : null}
                    {gameTimelineOvertimeOne.length > 0 ? gameTimelineOvertimeOne.map((timelineItem, index) => this._renderTimelineItem(index, timelineItem)) : null}

                    {gameTimelineOvertimeTwo > 0 ? 
                    <li className="time-label">
                        <span className="bg-gray">
                            2º Tempo da Prorrogação
                        </span>
                    </li> : null}
                    {gameTimelineOvertimeTwo > 0 ? gameTimelineOvertimeTwo.map((timelineItem, index) => this._renderTimelineItem(index, timelineItem)) : null}
                    
                    <li>
                        <i className="fa fa-clock bg-gray"></i>
                    </li>
                </ul>
            </div>
        );
    }
}