import React, { Component } from 'react'
import { inject } from 'mobx-react';
import Select from '../../../../components/forms/Select';
import SUITS, { getSuitLabel } from '../../constants/suits';
import CATEGORIES, { getCategoryLabel } from '../../constants/categories';
import Icon from '../../../../layout/Icon';

@inject("routerStore")
@inject("tournamentStore")
export default class CategoriesTabForm extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            categoryEdit: {},
        };

        this._addCategory = this._addCategory.bind(this);
        this._removeCategory = this._removeCategory.bind(this);
    }

    _addCategory(e) {
        if (this.props.tournamentStore.addCategory(this.state.categoryEdit)){
            this.setState({ categoryEdit: {} });
        }
    }

    _removeCategory(category) {
        this.props.tournamentStore.removeCategory(category);
    }


    render() {
        const { tournament, edit } = this.props.tournamentStore;
        return (
            <div>
                <div className="row">
                    <Select cols="12 5" 
                        label="Naipe"
                        options={SUITS} 
                        disabled={!edit}
                        value={this.state.categoryEdit.suit} 
                        onChange={e => this.setState({ categoryEdit: { ...this.state.categoryEdit, suit: e.target.value }})} />
                    <Select cols="12 5" 
                        label="Categoria:"
                        options={CATEGORIES} 
                        disabled={!edit}
                        value={this.state.categoryEdit.category} 
                        onChange={e => this.setState({ categoryEdit: { ...this.state.categoryEdit, category: e.target.value }})} />
                    <div className="col-xs-12 col-sm-2">
                        <button id="btn-add-category" style={{ marginTop: 25 }} type="button" className={`btn btn-default ${!edit ? 'disabled' : ''}`} onClick={this._addCategory}><Icon type="fa" name="plus" /> Adicionar</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="box-body no-padding table-responsive ">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th style={{width: 10}}>#</th>
                                        <th>Naipe</th>
                                        <th>Categoria</th>
                                        <th style={{width: 10}}><Icon type="fa" name="shield-alt" alt="Equipes" title="Equipes" /></th>
                                        {edit ? <th style={{width: 10}} colSpan="2">Ações</th> : null }
                                    </tr>
                                </thead>
                                <tbody>
                                    {tournament.categories && tournament.categories.length > 0 ? 
                                    tournament.categories.map((category, index) => {
                                        return (
                                            <tr key={`tr-category-${category.suit}-${category.category}`}>
                                                <td style={{width: 10}}>{index + 1}.</td>
                                                <td>{getSuitLabel(category.suit)}</td>
                                                <td>{getCategoryLabel(category.category)}</td>
                                                <td style={{width: 10}}>0</td>
                                                {edit ? 
                                                <td style={{width: 10}} colSpan="2">
                                                    <a href="javascript:;" title="Remover categoria" alt="Remover categoria"
                                                        onClick={() => this._removeCategory(category)}>
                                                        <Icon type="fa"name="trash" />
                                                    </a>
                                                </td> 
                                                : null }
                                            </tr>
                                        );
                                    })
                                    :
                                    <tr><td colSpan="5">Nenhuma categoria configurada.</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}
