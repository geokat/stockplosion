import React from 'react';

var Summary = React.createClass({
  render: function() {
    return (
      <div className="summary">
        <div className="companyName">
          {this.props.data.name} ({this.props.data.symbol})
        </div>
        <div>Recommendation: wait</div>
      </div>
    );
  },
});

module.exports = Summary;
