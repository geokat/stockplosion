import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import Chart from '../scripts/Chart.jsx';
import mockChartData from './utils.js';

describe('Chart', function() {
  it('loads without error', function() {
    var chart = TestUtils.renderIntoDocument(
      <Chart />
    );
    expect(chart).toExist();
  });

  it('renders navigation buttons', function() {
    var chart = TestUtils.renderIntoDocument(
      <Chart />
    );
    var btns = TestUtils.scryRenderedDOMComponentsWithTag(
      chart, 'input'
    );
    expect(btns[0].value).toEqual('<');
    expect(btns[1].value).toEqual('>');
  });

  it('renders d3 chart', function() {
    var node = document.createElement('div');
    var chart = ReactDOM.render(
      <Chart data={mockChartData} dispSize={31} />,
      node
    );
    chart.forceUpdate();
    var chartEl = ReactDOM.findDOMNode(chart);
    expect(chartEl.getElementsByTagName('path').length).toEqual(3);
  });
});
