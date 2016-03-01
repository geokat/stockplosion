import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import Summary from '../scripts/Summary.jsx';
import mock from './utils.js';

describe('Summary', function() {
  it('loads without errors', function() {
    var summary = TestUtils.renderIntoDocument(
      <Summary data={mock.mockChartData1} />
    );
    expect(summary).toExist();
  });

  it('displays company name', function() {
    var summary = TestUtils.renderIntoDocument(
      <Summary data={mock.mockChartData1} />
    );
    var name = TestUtils.scryRenderedDOMComponentsWithTag(
      summary, 'span'
    )[0];
    expect(name.textContent).toEqual('Beier-Rice');
  });

  it('displays company ticker', function() {
    var summary = TestUtils.renderIntoDocument(
      <Summary data={mock.mockChartData1} />
    );
    var name = TestUtils.scryRenderedDOMComponentsWithTag(
      summary, 'span'
    )[1];
    expect(name.textContent).toEqual('DXBT');
  });

  it('recommends to SELL', function() {
    var summary = TestUtils.renderIntoDocument(
      <Summary data={mock.mockChartData1} />
    );
    var rec = TestUtils.findRenderedDOMComponentWithClass(
      summary, 'recommendation'
    );
    expect(rec.textContent).toEqual('SELL');
  });

  it('recommends to BUY', function() {
    var summary = TestUtils.renderIntoDocument(
      <Summary data={mock.mockChartData2} />
    );
    var rec = TestUtils.findRenderedDOMComponentWithClass(
      summary, 'recommendation'
    );
    expect(rec.textContent).toEqual('BUY');
  });

  it('recommends to WAIT', function() {
    var summary = TestUtils.renderIntoDocument(
      <Summary data={mock.mockChartData3} />
    );
    var rec = TestUtils.findRenderedDOMComponentWithClass(
      summary, 'recommendation'
    );
    expect(rec.textContent).toEqual('WAIT');
  });

});
