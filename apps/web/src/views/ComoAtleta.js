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
        title: 'Como Atleta',
        active: true
    }
  ];

export default class ComoAtleta extends Component {

    render(){
        return (
            <Content title="Como Atleta" subtitle="Visualize informações como atleta." breadCrumb={<BreadCrumb arrayModel={breadcrumb} />} >
              <div className="row">
                  <BoxWidget id="competicoes" title="Título de Como Atleta" 
                      type="default" collapse remove
                      footer={'Rodapé de Como Atleta'}>

                      <p>Conteúdo de Como Atleta</p>
                  </BoxWidget>
              </div>
          </Content>
        );
    }
}