$(document).ready(function(){
  monthlyData();

})

function monthlyData(month){
    $.ajax({
    url: '/months',
    method: 'GET',
    dataType: 'json'
  }).done(function(month){
    var w = 1000;
    var h = 500;
    var padding = 40;
     

    month_data = [ 
      [1, month[0].total_month_gross],
      [2, month[1].total_month_gross],
      [3, month[2].total_month_gross],
      [4, month[3].total_month_gross],
      [5, month[4].total_month_gross],
      [6, month[5].total_month_gross],
      [7, month[6].total_month_gross],
      [8, month[7].total_month_gross],
      [9, month[8].total_month_gross],
      [10, month[9].total_month_gross],
      [11, month[10].total_month_gross],
      [12, month[11].total_month_gross]
    ];


    var months = ["", "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var formatMonth = function(d) {
      return months[d % 12];      
    }

    var svg = d3.select("#data_area")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var xScale = d3.scale.linear()
                        .domain([0, d3.max(month_data, function(d) { return d[0]; })])
                        .range([padding, w - padding]);


    var yScale = d3.scale.linear()
                     .domain([0, d3.max(month_data, function(d) { return d[1]; })])
                     .range([h - padding, padding]);

    var xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .tickFormat(formatMonth);

    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left")
                      .ticks(6)

    svg.selectAll("circle")
        .data(month_data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return xScale(d[0]);
        })
        .attr("cy", function(d) {
          return yScale(d[1]);
        })
        .attr("r", 6);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")") 
        .call(xAxis);

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

  })
}