//This is from the 6.170 p3demo shown in recitation 
//https://github.com/kongming92/6170-p3demo.git
var helpers = (function() {
  var self = {};
  self.getFormData = function(form) {
    var inputs = {};
    $(form).serializeArray().forEach(function(item) {
      inputs[item.name] = item.value;
    });
    return inputs;
  };

  //Draws a line draph of given data in the specifid location
  self.drawLineGraph = function(data, location) {
    var xValues = data.map(function(d){return d.label});
    var vis = d3.select(location),
        WIDTH = 500,
        HEIGHT = 250,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xBarScale = d3.scale.ordinal()
          .rangeRoundBands([MARGINS.left, WIDTH- MARGINS.right], 0)
          .domain(xValues), 
        xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(data, function(d) {
            console.log(d.x);
            return d.x;
        }), d3.max(data, function(d) {
            return d.x;
        })]),
        yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(data, function(d) {
            return d.y;
        }), d3.max(data, function(d) {
            return d.y;
        })]),
        xAxis = d3.svg.axis()
            .scale(xBarScale).tickValues(xValues)
            .tickSize(2)

        yAxis = d3.svg.axis()
            .scale(yRange)
            .tickSize(2)
            .orient('left')

    vis.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
        .call(xAxis);

    vis.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
        .call(yAxis);

    var lineFunc = d3.svg.line()
        .x(function(d) {
            return xRange(d.x);
        })
        .y(function(d) {
            return yRange(d.y);
        })
        .interpolate('linear');

    vis.append('svg:path')
        .attr('d', lineFunc(data))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
};

//draws a bar graph based on the data at the location
self.drawBarGraph = function(barData, location) {
  var xValues = barData.map(function(d){return d.label});
	var vis = d3.select(location),
    WIDTH = 500,
    HEIGHT = 250,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.scale.linear().range([MARGINS.left + 30, WIDTH - MARGINS.right]).domain([d3.min(barData, function(d) {
        return (d.x);
      }),
      d3.max(barData, function (d) {
        return (d.x);
      })
    ]),
 
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(barData, function(d) {
        return d.y;
      }),
      d3.max(barData, function (d) {
        return d.y;
      })
    ]),
    xBarScale = d3.scale.ordinal()
      .rangeRoundBands([MARGINS.left, WIDTH- MARGINS.right], 0)
      .domain(xValues), 
 
    xAxis = d3.svg.axis()
      .scale(xBarScale)
      .tickSize(2)
 
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(2)
      .orient("left")
 
  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);
 
  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
    .call(yAxis);

vis.selectAll('rect')
  .data(barData)
  .enter()
  .append('rect')
  .attr('x', function(d) { // sets the x position of the bar
    return xRange(d.x) - 20;
  })
  .attr('y', function(d) { // sets the y position of the bar
    return yRange(d.y);
  })
  .attr('width', 20) // sets the width of bar
  .attr('height', function(d) {      // sets the height of bar
    return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
  })
  .attr('fill', 'grey');   // fills the bar with grey color
};

  return self;
})();

