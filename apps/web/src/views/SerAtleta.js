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
        link: '/atleta',
        title: 'Atleta'
    },
    {
        title: 'Ser Atleta',
        active: true
    }
  ];

export default class SerAtleta extends Component {

    render(){
        return (
            <Content title="Ser Atleta" subtitle="Forneça informações como atleta." breadCrumb={<BreadCrumb arrayModel={breadcrumb} />} >
                <div className="row">
                    <BoxWidget id="set-atleta" title="Título de Ser Atleta" 
                        type="default" collapse remove
                        footer={'Rodapé de Ser Atleta'}>

                        <p>Conteúdo de Ser Atleta</p>
                    </BoxWidget>
                </div>
          </Content>
        );
    }
}