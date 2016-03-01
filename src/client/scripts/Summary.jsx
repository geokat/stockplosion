import React from 'react';

var Summary = React.createClass({
  getMinMax: function() {
    var prices = this.props.data.prices;
    var min = prices[0].price, min_i = 0;
    var max = prices[0].price, max_i = 0;

    prices.forEach(function(v, k) {
      if (v.price < min) {
        min_i = k;
        min = v.price;
      } else if (v.price > max) {
        max_i = k;
        max = v.price;
      }
    });

    return {min: min_i, max: max_i};
  },

  getRecommendation: function() {
    if (this.props.data.prices === undefined) {
      return '';
    }

    var minMax = this.getMinMax();
    var min = minMax.min;
    var max = minMax.max;

    // If we're just past the minimum but not at the maxium, BUY.
    // If we're just past the maximum but not at the minimum, SELL.
    // Otherwise, WAIT.
    var now = this.props.data.prices.length - 1;
    if (now === min + 1 && now !== max) {
      return 'BUY';
    }
    if (now === max + 1 && now !== min) {
      return 'SELL';
    }
    return 'WAIT';
  },

  render: function() {
    return (
      <div className="summary">
        <div className="companyName">
          <span className="name">{this.props.data.name}</span> (<span className="symbol">{this.props.data.symbol}</span>)
        </div>
        <div>Recommendation: <span className="recommendation">{this.getRecommendation()}</span></div>
      </div>
    );
  },
});

module.exports = Summary;
