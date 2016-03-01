import React from 'react';
import d3 from 'd3';
import Autocomplete from 'react-autocomplete';

var SymbolForm = React.createClass({
  styles: {
    item: {
      padding: '2px 6px',
      cursor: 'default'
    },
    highlightedItem: {
      color: 'white',
      background: 'hsl(200, 50%, 50%)',
      padding: '2px 6px',
      cursor: 'default'
    },
    menu: {
      border: 'solid 1px #ccc'
    }
  },

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    this.loadCompanyList();
  },

  loadCompanyList: function() {
    d3.json(this.props.tickerUrl, function(err, result) {
      if (err) { console.log(err); return; }
      this.companyList = result.map(function(v) {
        return {
          name: v.name,
          symbol: v.symbol
        };
      }.bind(this));
      this.forceUpdate();
    }.bind(this));
  },

  handleSelect: function(symbol) {
    this.props.onSymbolSubmit(symbol);
  },

  sortCompanies: function(a, b, value) {
    return (
      a.name.toLowerCase().indexOf(value.toLowerCase()) >
      b.name.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
    );
  },

  matchCompanyToTerm: function(company, value) {
    return (
      company.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      company.symbol.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  },

  render: function() {
    if (this.companyList === undefined) {
      return false;
    }
    return (
      <div className="symbolForm">
        <Autocomplete
            items={this.companyList}
            getItemValue={(item) => item.symbol}
            shouldItemRender={this.matchCompanyToTerm}
            sortItems={this.sortCompanies}
            onSelect={this.handleSelect}
            renderItem={
              (item, isHighlighted) => (
                <div style={isHighlighted ? this.styles.highlightedItem : this.styles.item}
                     key={item.symbol}>{item.name} ({item.symbol})</div>)}
        />
        <div>Start typing another name/symbol</div>
      </div>
    );
  }
});

module.exports = SymbolForm;
