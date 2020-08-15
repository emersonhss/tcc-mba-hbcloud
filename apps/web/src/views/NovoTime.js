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
        link: '/times',
        title: 'Times'
    },
    {
        title: 'Novo Time',
        active: true
    }
  ];

export default class NovoTime extends Component {

    render(){
        return (
            <Content title="Novo Time" subtitle="Cadastre um novo time." breadCrumb={<BreadCrumb arrayModel={breadcrumb} />} >
              <div className="row">
                    <BoxWidget id="novo_time" title="Novo Time" 
                        type="default" collapse remove
                        footer={'Rodapé do Novo Time'}>

                        <p>Conteúdo do BoxWidget</p>
                    </BoxWidget>
                </div>
          </Content>
        );
    }
}