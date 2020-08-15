import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import BoxWidget from '../../../../layout/BoxWidget';
import Icon from '../../../../layout/Icon';
import './GameItemList.css';

export default class GameItemList extends Component {


    render() {
        const { game, baseLink } = this.props;

        return (
            <BoxWidget key={`game_${game._id}`} id={`partida-${game._id}`} type="default" cols="12 6">
                    
                <div className="col-xs-12 small">
                    <div>
                        <Icon type="fa" name="calendar" /> {game.date} - <Icon type="fa" name="clock" /> {game.time}
                        <span className="pull-right">
                            <span style={{ marginLeft: 10 }}><Link to={`${baseLink}/${game._id}/edit`} replace={true}><Icon type="fa" name="edit" /></Link></span>
                            <span style={{ marginLeft: 10 }}><Link to={`${baseLink}/${game._id}`} replace={true}><Icon type="fa" name="eye" style={{ marginLeft: 10 }} /></Link></span>
                        </span>    
                    </div> 
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-betwenn', alignContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <div className="col-xs-5">
                        <div className="text-left">{game.aTeam.name}</div>
                        <div className={`bg-${game.aTeam.color ? game.aTeam.color : 'black'}`} style={{ display: 'block', width: '100%', height: '5px'}}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '5px' }}>
                            <a role="button"><Icon type="fa" name="shield-alt" size="3" /> <span></span> </a>
                            <div style={{ fontSize: 40, fontWeight: 500 }}>{game.aTeam.goals.length}</div>
                        </div>
                    </div>
                    <div className="col-xs-2 text-center">x</div>
                    <div className="col-xs-5">
                        <div className="text-right">{game.bTeam.name}</div>
                        <div className={`bg-${game.bTeam.color ? game.bTeam.color : 'blue'}`} style={{ display: 'block', width: '100%', height: '5px'}}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '5px' }}>
                            <div style={{ fontSize: 40, fontWeight: 500 }}>{game.bTeam.goals.length}</div>
                            <a role="button"><Icon type="fa" name="shield-alt" size="3" /> <span></span> </a>
                        </div>
                    </div>
                </div>

                <div className="col-xs-12 text-center small">
                    <Icon type="fa" name="map-marker-alt" /> {game.locality}
                </div>
                
            </BoxWidget>
        );
    }
}