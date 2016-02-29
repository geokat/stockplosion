import React from 'react';

var SymbolForm = React.createClass({
  getInitialState: function() {
    return {symbol: ''};
  },

  componentDidMount: function() {
    return;
    // TODO: Get list of symbols/names for autocomplete
    //       https://github.com/reactjs/react-autocomplete
  },

  handleSymbolChange: function(e) {
    this.setState({symbol: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var symbol = this.state.symbol.trim();
    if (!symbol) {
      return;
    }
    this.props.onSymbolSubmit(symbol);
    this.setState({symbol: ''});
  },

  render: function() {
    return (
      <form className="symbolForm" onSubmit={this.handleSubmit}>
        <input type="text"
               placeholder="Start typing another symbol/name"
               value={this.state.symbol}
               onChange={this.handleSymbolChange} />

      </form>
    );
  }
});

module.exports = SymbolForm;
