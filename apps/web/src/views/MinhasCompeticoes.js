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
        title: 'Minhas Competições',
        active: true
    }
  ];

export default class MinhasCompeticoes extends Component {

    render(){
        return (
            <Content title="Minhas Competições" subtitle="Gerencie suas competições." breadCrumb={<BreadCrumb arrayModel={breadcrumb} />} >
                <div className="row">
                    <BoxWidget id="competicoes" title="Título de Competições" 
                        type="default" collapse remove
                        footer={'Rodapé do Competições'}>

                        <p>Conteúdo do Competições</p>
                    </BoxWidget>
                </div>
          </Content>
        );
    }
}