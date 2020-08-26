import React, { Component } from 'react';
import jQuery from 'jquery';
import convertColsClasses from '../helpers/convertColsClasses';
import generateIdComponent from '../helpers/generateIdComponent';

const ACCEPT_TYPES = ['default', 'success', 'warning', 'danger'];
const $ = jQuery;

export default class BoxWidget extends Component {

    constructor(props) {
        super(props);
        const bwId = props.id ? `bw_${props.id}` : generateIdComponent('bw_');
        this.state = {
          bwId 
        };
    }

    componentDidMount(){
      const { bwId } = this.state;
      $(`#${bwId}`).boxWidget({
        animationSpeed: 500,
        collapseTrigger: `#${bwId}_cb`,
        removeTrigger: `#${bwId}_rb`,
        collapseIcon: 'fa-minus',
        expandIcon: 'fa-plus',
        removeIcon: 'fa-times'
      });
    }

    _collapse() {
      const { bwId } = this.state;
      return (
        <button id={`${bwId}_cb`} type="button" className="btn btn-box-tool" 
            data-widget="collapse" data-toggle="tooltip" 
            title="" data-original-title="Collapse">
                      <i className="fa fa-minus"></i></button>
      );
    }

    _remove() {
      const { bwId } = this.state;
      return (
        <button id={`${bwId}_rb`} type="button" className="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="" data-original-title="Remove"
          onClose={() => { this.props.onClose && this.props.onClose() }}>
          <i className="fa fa-times"></i>
        </button>
      );
    }

    _header(title, collapse, remove, pullRightContent) {
      return (title || collapse || remove) ?  (
        <div className="box-header with-border">
          <h3 className="box-title">{title}</h3>

          <div className="box-tools pull-right">
            {pullRightContent ? pullRightContent : null}
            {collapse ? this._collapse() : ''}
            {remove ? this._remove() : ''}
          </div>
        </div>
      ) : '';
    }

    _body(){
      const { type, title, collapse, remove, footer, solid, pullRightContent } = this.props;
      const { bwId } = this.state;
      const classType = ACCEPT_TYPES.includes(type) ? `box-${type}` : '';
      const classSolid = solid ? 'box-solid' : '';
      return (
        <div id={bwId} className={`box ${classType} ${classSolid}`}>
              {/* <!-- Default box --> */}
                {this._header(title, collapse, remove, pullRightContent)}
                <div className="box-body">
                  {this.props.children}
                </div>
                {/* <!-- /.box-body --> */}
                {this._footer(footer)}
                {/* <!-- /.box-footer--> */}
              {/* <!-- /.box --> */}
            </div>
      );
    }

    _footer(componentFooter) {
      return componentFooter ? (
        <div className="box-footer">
            {componentFooter}
        </div>
      ) : '';
    }

    render() {
        const { cols, className } = this.props;
        
        const classCols = convertColsClasses(cols);
        return (
          <div className={`${classCols} ${className}`}>
            {this._body()}
          </div>
        );
    }

}