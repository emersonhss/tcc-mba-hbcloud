import React, { Component } from 'react';
import Content from '../layout/Content';
import BreadCrumb from '../layout/BreadCrumb';
import BoxWidget from '../layout/BoxWidget';

const breadcrumb = [
    {
        link: '/',
        title: 'Início'
    },
    {
        link: '/competicoes',
        title: 'Competições'
    },
    {
        title: 'Nova Competição',
        active: true
    }
  ];

export default class NovaCompeticao extends Component {

    render(){
        return (
            <Content title="Nova Competição" subtitle="Cadastre uma nova competição." breadCrumb={<BreadCrumb arrayModel={breadcrumb} />} >
                <div className="row">
                    <BoxWidget id="nova-competicao" title="Título de Nova Competição" 
                        type="default" collapse remove
                        footer={'Rodapé da Nova Competição'}>

                        <p>Conteúdo da Nova Competição</p>
                    </BoxWidget>
                </div>
            </Content>
        );
    }
}