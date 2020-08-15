import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import BoxWidget from '../../../../layout/BoxWidget';
import Icon from '../../../../layout/Icon';
import './TournamentItemList.css';

export default class TournamentItemList extends Component {


    render() {
        const { tournament, baseLink } = this.props;

        return (
            <BoxWidget key={`tournament_${tournament._id}`} id={`partida-${tournament._id}`} type="default" cols="12 6">
                    
                <div className="col-xs-12 small">
                    <div>
                        <Icon type="fa" name="calendar" /> {tournament.startDate} - {tournament.endDate}
                        <span className="pull-right">
                            <span style={{ marginLeft: 10 }}><Link to={`${baseLink}/${tournament._id}/edit`} replace={true}><Icon type="fa" name="edit" /></Link></span>
                            <span style={{ marginLeft: 10 }}><Link to={`${baseLink}/${tournament._id}`} replace={true}><Icon type="fa" name="eye" style={{ marginLeft: 10 }} /></Link></span>
                        </span>    
                    </div> 
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-betwenn', alignContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <div className="col-xs-12">
                        <div className="text-left">{tournament.name}</div>
                        <div className={`bg-${tournament.color ? tournament.color : 'blue'}`} style={{ display: 'block', width: '100%', height: '5px'}}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '5px' }}>
                            <a role="button"><Icon type="fa" name="trophy" size="3" /> <span></span> </a>
                            <div style={{ fontSize: 20, fontWeight: 500 }}>{tournament.name}</div>
                            <Link to={`${baseLink}/${tournament._id}/inscricao/nova`} className="btn btn-primary"
                                title="Inscreva sua agremiação e equipes" 
                                alt="Inscreva sua agremiação e equipes" 
                                replace={true}>
                                <Icon type="fa" name="file-signature" style={{ marginLeft: 10 }} /> Inscreva-se
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-xs-12 text-center small">
                    <Icon type="fa" name="map-marker-alt" /> {tournament.locality}
                </div>
                
            </BoxWidget>
        );
    }
}