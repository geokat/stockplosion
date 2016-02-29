require('../styles/main.css');

import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import SymbolForm from './SymbolForm.jsx';
import Summary from './Summary.jsx';
import Chart from './Chart.jsx';

var App = React.createClass({
  dateFormat: d3.time.format.utc('%Y%m%d'),
  parseDate:  d3.time.format.utc('%Y%m%d').parse,
  tickerUrl:  'http://stocksplosion.apsis.io/api/company/',
  defaultSym: 'DXBT',
  dispSize:   31,

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadCompanyData(this.defaultSym);
  },

  loadCompanyData: function(symbol) {
    // We use latest data for the symbol.
    var d = new Date(); d.setDate(d.getDate() + 1);
    var end = this.dateFormat(d);
    d.setDate(d.getDate() - this.dispSize);
    var start = this.dateFormat(d);
    var url = this.tickerUrl + symbol + '?startdate=' + start + '&enddate=' + end;

    d3.json(url, function(err, result) {
      if (err) { console.log(err); return; }
      var prices = Object.keys(result.prices).sort().map(function(k) {
        return {
          date: this.parseDate(k),
          price: +result.prices[k]
        };
      }.bind(this));
      var data = {
        symbol:  result.company.symbol,
        name:    result.company.name,
        prices:  prices
      }
      this.setState({data: data});
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <div className="header-app">
          <Summary data={this.state.data} />
          <SymbolForm onSymbolSubmit={this.loadCompanyData}
                      tickerUrl={this.tickerUrl} />
        </div>
        <Chart data={this.state.data}
               dispSize={this.dispSize}
               dateFormat={this.dateFormat}
               parseDate={this.parseDate}
               tickerUrl={this.tickerUrl} />
      </div>
    );
  },
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
