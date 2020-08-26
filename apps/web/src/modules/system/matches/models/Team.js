import BaseModel from '../../models/BaseModel';
import { FIRST_TIME, SECOND_TIME, OVERTIME_ONE, OVERTIME_TWO } from '../../constants/match-times';

export default class Team extends BaseModel {

    constructor(literalObject) {
        super();
        if(literalObject) {
            const { _id, shield, name, locality, goals, warnings, exclusions, disqualifications, technicalTimes, color, members } = literalObject
            this._id = _id;
            this.shield = shield;
            this.name = name;
            this.locality = locality;
            this.goals = goals ? [].concat(goals) : [];
            this.warnings = warnings ? [].concat(warnings) : [];
            this.exclusions= exclusions  ? [].concat(exclusions) : [];
            this.disqualifications= disqualifications  ? [].concat(disqualifications) : [];
            this.technicalTimes= technicalTimes ? [].concat(technicalTimes) : [];;
            this.color = color;
            this.members = members ? [].concat(members) : [];
        } else {
            this._id = '';
            this.shield = '';
            this.name = '';
            this.locality = '';
            this.goals = [];
            this.warnings = [];
            this.exclusions= [];
            this.disqualifications= [];
            this.technicalTimes= [];
            this.color='';
            this.members = [];
        }
    }

    hasGameRegisters() {
        return this.hasGoals() || this.hasWarnings() || this.hasExclusions() || this.hasDisqualifications() || this.hasTechnicalTimes(); 
    }

    hasGoals() {
        return this.goals && this.goals.length > 0;
    }

    hasWarnings() {
        return this.warnings && this.warnings.length > 0;
    }

    hasExclusions() {
        return this.exclusions && this.exclusions.length > 0;
    }

    hasDisqualifications() {
        return this.disqualifications && this.disqualifications.length > 0;
    }

    hasTechnicalTimes() {
        return this.technicalTimes & this.technicalTimes.length > 0;
    }

    getTeamGoalsTimeline() {
        let numberGoalsTeamA = 0;
        const teamGoalsFirstTime = this.getTimeLineByMatch('goals', FIRST_TIME.value, numberGoalsTeamA);
        numberGoalsTeamA += teamGoalsFirstTime.length;
        const teamGoalsSecondTime = this.getTimeLineByMatch('goals', SECOND_TIME.value, numberGoalsTeamA);
        numberGoalsTeamA += teamGoalsSecondTime.length;
        const teamGoalsOneOverTime = this.getTimeLineByMatch('goals', OVERTIME_ONE.value, numberGoalsTeamA);
        numberGoalsTeamA += teamGoalsOneOverTime.length;
        const teamGoalsSecondOverTime = this.getTimeLineByMatch('goals', OVERTIME_TWO.value, numberGoalsTeamA);        
        return [].concat(teamGoalsFirstTime).concat(teamGoalsSecondTime).concat(teamGoalsOneOverTime).concat(teamGoalsSecondOverTime);
    }

    getTeamWarningsTimeline() {
        let numberWarningsTeam = 0;
        const warningsFirstTime = this.getTimeLineByMatch('warnings', FIRST_TIME.value, numberWarningsTeam);
        numberWarningsTeam += warningsFirstTime.length;
        const warningsSecondTime = this.getTimeLineByMatch('warnings', SECOND_TIME.value, numberWarningsTeam);
        numberWarningsTeam += warningsSecondTime.length;
        const warningsOneOverTime = this.getTimeLineByMatch('warnings', OVERTIME_ONE.value, numberWarningsTeam);
        numberWarningsTeam += warningsOneOverTime.length;
        const warningsSecondOverTime = this.getTimeLineByMatch('warnings', OVERTIME_TWO.value, numberWarningsTeam);        
        return [].concat(warningsFirstTime).concat(warningsSecondTime).concat(warningsOneOverTime).concat(warningsSecondOverTime);
    }

    getTeamExclusionsTimeline() {
        let numberExclusionsTeam = 0;
        const exclusionsFirstTime = this.getTimeLineByMatch('exclusions', FIRST_TIME.value, numberExclusionsTeam);
        numberExclusionsTeam += exclusionsFirstTime.length;
        const exclusionsSecondTime = this.getTimeLineByMatch('exclusions', SECOND_TIME.value, numberExclusionsTeam);
        numberExclusionsTeam += exclusionsSecondTime.length;
        const exclusionsOneOverTime = this.getTimeLineByMatch('exclusions', OVERTIME_ONE.value, numberExclusionsTeam);
        numberExclusionsTeam += exclusionsOneOverTime.length;
        const exclusionsSecondOverTime = this.getTimeLineByMatch('exclusions', OVERTIME_TWO.value, numberExclusionsTeam);        
        return [].concat(exclusionsFirstTime).concat(exclusionsSecondTime).concat(exclusionsOneOverTime).concat(exclusionsSecondOverTime);
    }

    getTeamDisqualificationsTimeline() {
        let numberDisqualificationsTeam = 0;
        const disqualificationsFirstTime = this.getTimeLineByMatch('disqualifications', FIRST_TIME.value, numberDisqualificationsTeam);
        numberDisqualificationsTeam += disqualificationsFirstTime.length;
        const disqualificationsSecondTime = this.getTimeLineByMatch('disqualifications', SECOND_TIME.value, numberDisqualificationsTeam);
        numberDisqualificationsTeam += disqualificationsSecondTime.length;
        const disqualificationsOneOverTime = this.getTimeLineByMatch('disqualifications', OVERTIME_ONE.value, numberDisqualificationsTeam);
        numberDisqualificationsTeam += disqualificationsOneOverTime.length;
        const disqualificationsSecondOverTime = this.getTimeLineByMatch('disqualifications', OVERTIME_TWO.value, numberDisqualificationsTeam);        
        return [].concat(disqualificationsFirstTime).concat(disqualificationsSecondTime).concat(disqualificationsOneOverTime).concat(disqualificationsSecondOverTime);
    }

    getTeamTechcnicalTimesTimeline() {
        let numberTechcnicalTimesTeam = 0;
        const technicalTimesFirstTime = this.getTimeLineByMatch('technicalTimes', FIRST_TIME.value, numberTechcnicalTimesTeam);
        numberTechcnicalTimesTeam += technicalTimesFirstTime.length;
        const technicalTimesSecondTime = this.getTimeLineByMatch('technicalTimes', SECOND_TIME.value, numberTechcnicalTimesTeam);
        numberTechcnicalTimesTeam += technicalTimesSecondTime.length;
        const technicalTimesOneOverTime = this.getTimeLineByMatch('technicalTimes', OVERTIME_ONE.value, numberTechcnicalTimesTeam);
        numberTechcnicalTimesTeam += technicalTimesOneOverTime.length;
        const technicalTimesSecondOverTime = this.getTimeLineByMatch('technicalTimes', OVERTIME_TWO.value, numberTechcnicalTimesTeam);        
        return [].concat(technicalTimesFirstTime).concat(technicalTimesSecondTime).concat(technicalTimesOneOverTime).concat(technicalTimesSecondOverTime);
    }

    getTeamTimeline() {
        return [].concat(this.getTeamGoalsTimeline())
                .concat(this.getTeamWarningsTimeline())
                .concat(this.getTeamExclusionsTimeline())
                .concat(this.getTeamDisqualificationsTimeline())
                .concat(this.getTeamTechcnicalTimesTimeline());
    }

    clone() {
       return super.clone(new Team());
    }

    getTimeLineByMatch(fieldName, matchTime, numberFields) {
        let quantityItens = numberFields;
        console.log('Itens:', fieldName, this[fieldName], ' - ', this.name);
        const itens = this[fieldName] || []; 
        return itens.filter(item => item['matchTime'] === matchTime)
                .sort((itemA, itemB) => itemA.time > itemB.time ? 1 : (itemA.time < itemB.time ? -1 : 0))
                .map(item => {
                    const timelineItem = {
                        field: fieldName,
                        matchTime: item['matchTime'],
                        time: item['time'],
                        member: item['athlete']
                    };
                    if (quantityItens >= 0) {
                        quantityItens++;
                        timelineItem.number = quantityItens;
                    }
                    return timelineItem;
                });
    }

}