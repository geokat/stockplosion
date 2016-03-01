import React from 'react';
import ReactDOM from 'react-dom';

import D3Chart from './D3Chart.js';

var Chart = React.createClass({
  cache: [],

  getInitialState: function() {
    return {dispStart: null, symbol: null};
  },

  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);
    D3Chart.create(el);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.symbol != this.props.data.symbol) {
      // New company data.
      this.cache = this.props.data.prices;
      this.state = {dispStart: 0, symbol: this.props.data.symbol};
    }
    var data = this.cache.slice(
      this.state.dispStart,
      this.state.dispStart + this.props.dispSize);
    D3Chart.update(data);
  },

  handleBackButton: function() {
    this.disableButtons(true);
    if (this.state.dispStart > 0) {
      this.setState({
        dispStart: this.state.dispStart - this.props.dispSize,
        symbol: this.props.data.symbol
      });
      this.disableButtons(false);
    } else {
      var end = this.cache[0].date;
      var start = d3.time.day.offset(end, -31);
      var url = this.props.tickerUrl + '/' + this.props.data.symbol +
                '?startdate=' + this.props.dateFormat(start) +
                '&enddate=' + this.props.dateFormat(end);
      d3.json(url, function(err, result) {
        if (err) { console.log(err); return; }
        var newData = Object.keys(result.prices).sort().map(function(k) {
          return {
            date: this.props.parseDate(k),
            price: +result.prices[k]
          };
        }.bind(this));
        this.cache = newData.concat(this.cache);
        this.disableButtons(false);
        this.setState({
          dispStart: 0,
          symbol: this.props.data.symbol
        });
      }.bind(this));
    }
  },

  handleForwardButton: function() {
    this.disableButtons(true);
    if (this.state.dispStart < this.cache.length - this.props.dispSize) {
      this.setState({
        dispStart: this.state.dispStart + this.props.dispSize,
        symbol: this.props.data.symbol
      });
    }
    this.disableButtons(false);
  },

  disableButtons: function(disable) {
    var el = ReactDOM.findDOMNode(this);
    d3.select(el).selectAll('#buttons input').each(function() {this.disabled = disable});
  },

  render: function() {
    return (
      <div id="chart">
        <div id="buttons">
          <input name="back"
                 type="button"
                 className="button"
                 value="<"
                 onClick={this.handleBackButton} />
          <input name="forward"
                 type="button"
                 className="button"
                 value=">"
                 onClick={this.handleForwardButton} />
        </div>
      </div>
    );
  }
});

module.exports = Chart;
