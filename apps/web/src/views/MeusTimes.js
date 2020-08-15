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
        title: 'Meus Times',
        active: true
    }
  ];

export default class MeusTime extends Component {

    render(){
        return (
            <Content title="Meus Times" subtitle="Gerencie seus times." breadCrumb={<BreadCrumb arrayModel={breadcrumb} />} >
              <div className="row">
                    <BoxWidget id="meus_times" title="Meus Times" 
                        type="default" collapse remove
                        footer={'Rodapé do Meus Times'}>

                        <p>Conteúdo do BoxWidget</p>
                
                    </BoxWidget>
                </div>
          </Content>
        );
    }
}