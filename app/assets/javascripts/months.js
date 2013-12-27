$(document).ready(function(){
  monthlyData();

  $('.year').on('click', function(){
    var year = this.id
    changeYear(year);
  });

   


  $('#scatter').on('click', function(){
    var year = parseInt($('input[name=radios]:checked').val())
    monthlyData();
  });



});

function getMoviePoster(top_movie){
  console.log(top_movie);
  var url = "http://www.omdbapi.com/";
  var params = {
    t: top_movie
  };
  $.getJSON(url, params, showMoviePoster);
};

function showMoviePoster(data) {
  movie_data = data;
  console.log(movie_data.Poster);
  $("#movie_poster").empty().append("<img id= 'poster' src=" + movie_data.Poster + "/>");
}




function monthlyData(){
    $.ajax({
    url: '/months',
    method: 'GET',
    dataType: 'json'
  }).done(function(month){
    var w = 800;
    var h = 400;
    var padding = 40;
     

    month_data = [ 
      [1, month[0].total_month_gross, "January", month[0].top_movie_title],
      [2, month[1].total_month_gross, "February", month[1].top_movie_title],
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

    d3.select("#data_area").selectAll("svg").remove();

    var svg = d3.select("#data_area")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("class", "ten columns")
                .attr("preserveAspectRatio", "none");

    var xScale = d3.scale.linear()
                        .domain([0, d3.max(month_data, function(d) { return d[0]; })])
                        .range([padding, w - padding]);


    var yScale = d3.scale.linear()
                     .domain([200, 1600])
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
        .attr("r", 6)
        .on("mouseover", function(e, i) {
              $( "#month_name" ).text(e[2])
              $( "#top_movie" ).text(e[3])
              top_movie = e[3]
              getMoviePoster(top_movie)
              d3.select(this)
              .attr("fill", "orange");
        })
        .on("mouseout", function(d) {
              d3.select(this)
              .attr("fill", "rgb(0, 0, " + (d * 10) + ")");
        });

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")") 
        .call(xAxis);

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

  })
};

function changeYear(year){
    $.ajax({
    url: '/get_year',
    data: {year: year},
    method: 'GET',
    dataType: 'json'
  }).done(function(month){
    var w = 800;
    var h = 400;
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

  
    var svg = d3.select("#data_area")
             
                .attr("width", w)
                .attr("height", h);
    var xScale = d3.scale.linear()
                        .domain([0, d3.max(month_data, function(d) { return d[0]; })])
                        .range([padding, w - padding]);
    var yScale = d3.scale.linear()
                     .domain([200, 1600])
                     .range([h - padding, padding]);

    var yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient("left")
                      .ticks(6)


    svg.selectAll("circle")
        .data(month_data)
        .transition()
        .attr("cx", function(d) {
          return xScale(d[0]);
        })
        .attr("cy", function(d) {
          return yScale(d[1]);
        })
        .attr("r", 6);



  })
  
};

