import d3 from 'd3';

var D3Chart = {};

D3Chart.create = function(el) {
  var margin = {top: 1, right: 50, bottom: 30, left: 50},
      width = 800 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  var bisectDate = d3.bisector(function(d) { return d.date; }).left,
      formatValue = d3.format(',.2f'),
      formatCcy = function(d) { return '$' + formatValue(d); };

  this.bisectDate = bisectDate;
  this.formatCcy = formatCcy;

  var xScale = d3.time.scale()
    .range([0, width]);

  var yScale = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  var line = d3.svg.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.price); });

  this.xScale = xScale;
  this.yScale = yScale;
  this.xAxis = xAxis;
  this.yAxis = yAxis;
  this.line = line;

  var svg = d3.select(el).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var x = svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')');
  var y = svg.append('g')
    .attr('class', 'y axis');

  y.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Price ($)');

  var path = svg.append('path')
    .attr('class', 'line');

  var focus = svg.append('g')
    .attr('class', 'focus')
    .style('display', 'none');

  focus.append('circle')
    .attr('r', 4.5);

  focus.append('text')
    .attr('x', 9)
    .attr('dy', '.35em');

  svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', function() { focus.style('display', null); })
    .on('mouseout', function() { focus.style('display', 'none'); })
    .on('mousemove', this._mouseMove);

  this.x = x;
  this.y = y;
  this.path = path;
  this.focus = focus
  this.data = [];
};

D3Chart.update = function(data) {
  this.data = data;
  this.xScale.domain([data[0].date, data[data.length - 1].date]);
  this.yScale.domain(d3.extent(data, function(d) { return d.price; }));
  this.x.call(this.xAxis);
  this.y.call(this.yAxis);
  this.path.datum(data).attr('d', this.line);
};

D3Chart._mouseMove = function() {
  var ch = D3Chart;

  if(!ch.data.length)
    return;

  var x0 = ch.xScale.invert(d3.mouse(this)[0]),
      i = ch.bisectDate(ch.data, x0),
      d0 = ch.data[i - 1],
      d1 = ch.data[i],
      d = d0 !== undefined && x0 - d0.date < d1.date - x0 ? d0 : d1;
  ch.focus.attr('transform',
               'translate(' +
               ch.xScale(d.date) + ',' +
               ch.yScale(d.price) + ')');
  ch.focus.select('text').text(ch.formatCcy(d.price));
};

module.exports = D3Chart;
