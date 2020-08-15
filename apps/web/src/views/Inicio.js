import React, { Component } from 'react';
import Content from '../layout/Content';
import BreadCrumb from '../layout/BreadCrumb';
import BoxWidget from '../layout/BoxWidget';

const breadcrumb = [
    {
        link: '/',
        title: 'Início'
    }
  ];

export default class SerAtleta extends Component {

    render(){
        return (
            <Content title="Início" subtitle="Viva o handebol!" 
                breadCrumb={<BreadCrumb arrayModel={breadcrumb} />} >
                <div className="row">
                    <BoxWidget id="inicio_atleta" cols='12 6' solid>
                        <p>Atleta</p>
                    </BoxWidget>

                    <BoxWidget id="inicio_clubes" cols='12 6' solid>
                        <p>Clubles</p>
                    </BoxWidget>

                    <BoxWidget id="inicio_competicoes" cols='12 6' solid>
                        <p>Competições</p>
                    </BoxWidget>

                    <BoxWidget id="inicio_arbitrage" cols='12 6' solid>
                        <p>Arbitragem</p>
                    </BoxWidget>
                </div>

                <div className="row">
                    <BoxWidget id="inicio" title="Título do BoxWidget" 
                        type="default" collapse remove
                        footer={'Rodapé do BoxWidget'}>

                        <p>Conteúdo do BoxWidget</p>
                    </BoxWidget>
                </div>
            </Content>
        );
    }
}