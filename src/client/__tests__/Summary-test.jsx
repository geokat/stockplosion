import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import Summary from '../scripts/Summary.jsx';
import mockChartData from './utils.js';

describe('Summary', function() {
  it('loads without errors', function() {
    var summary = TestUtils.renderIntoDocument(
      <Summary data={mockChartData} />
    );
    expect(summary).toExist();
  });

  it('displays company name', function() {
    var summary = TestUtils.renderIntoDocument(
      <Summary data={mockChartData} />
    );
    var name = TestUtils.scryRenderedDOMComponentsWithTag(
      summary, 'span'
    )[0];
    expect(name.textContent).toEqual('Beier-Rice');
  });

  it('displays company ticker', function() {
    var summary = TestUtils.renderIntoDocument(
      <Summary data={mockChartData} />
    );
    var name = TestUtils.scryRenderedDOMComponentsWithTag(
      summary, 'span'
    )[1];
    expect(name.textContent).toEqual('DXBT');
  });
});
