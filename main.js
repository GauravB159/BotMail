import React from 'react';
import ReactDOM from 'react-dom';
import CardName from './src/js/card_name.jsx';
window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toCardName = function () {
  this.cardType = 'CardName';
}

ProtoGraph.Card.toCardName.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toCardName.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  ReactDOM.render(
    <CardName
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}
