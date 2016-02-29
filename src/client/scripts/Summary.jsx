import React from 'react';

var Summary = React.createClass({
  render: function() {
    return (
      <div className="summary">
        <div className="companyName">
          <span className="name">{this.props.data.name}</span> (<span className="symbol">{this.props.data.symbol}</span>)
        </div>
        <div>Recommendation: wait</div>
      </div>
    );
  },
});

module.exports = Summary;
