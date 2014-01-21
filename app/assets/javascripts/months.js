$(document).ready(function(){
  monthlyData();

  $('.year').on('click', function(){
    var year = this.id
    changeYear(year);

    $("#stats").children().contents().html("");

    $("#movie_poster").html("");
    
  });

   


  $('#scatter').on('click', function(){
    var year = parseInt($('input[name=radios]:checked').val())
    monthlyData();
  });



});

function getMoviePoster(top_movie){
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
      [1, month[0].total_month_gross, month[0].month_name, month[0].top_movie_title, month[0].top_movie_gross, month[0].percent_of_year, month[0].number_of_movies_released, month[0].average_gross, month[0].average_drop, month[0].total_month_gross ],
      [2, month[1].total_month_gross, month[1].month_name, month[1].top_movie_title, month[1].top_movie_gross, month[1].percent_of_year, month[1].number_of_movies_released, month[1].average_gross, month[1].average_drop, month[1].total_month_gross ],
      [3, month[2].total_month_gross, month[2].month_name, month[2].top_movie_title, month[2].top_movie_gross, month[2].percent_of_year, month[2].number_of_movies_released, month[2].average_gross, month[2].average_drop, month[2].total_month_gross ],
      [4, month[3].total_month_gross, month[3].month_name, month[3].top_movie_title, month[3].top_movie_gross, month[3].percent_of_year, month[3].number_of_movies_released, month[3].average_gross, month[3].average_drop, month[3].total_month_gross ],
      [5, month[4].total_month_gross, month[4].month_name, month[4].top_movie_title, month[4].top_movie_gross, month[4].percent_of_year, month[4].number_of_movies_released, month[4].average_gross, month[4].average_drop, month[4].total_month_gross ],
      [6, month[5].total_month_gross, month[5].month_name, month[5].top_movie_title, month[5].top_movie_gross, month[5].percent_of_year, month[5].number_of_movies_released, month[5].average_gross, month[5].average_drop, month[5].total_month_gross ],
      [7, month[6].total_month_gross, month[6].month_name, month[6].top_movie_title, month[6].top_movie_gross, month[6].percent_of_year, month[6].number_of_movies_released, month[6].average_gross, month[6].average_drop, month[6].total_month_gross ],
      [8, month[7].total_month_gross, month[7].month_name, month[7].top_movie_title, month[7].top_movie_gross, month[7].percent_of_year, month[7].number_of_movies_released, month[7].average_gross, month[7].average_drop, month[7].total_month_gross ],
      [9, month[8].total_month_gross, month[8].month_name, month[8].top_movie_title, month[8].top_movie_gross, month[8].percent_of_year, month[8].number_of_movies_released, month[8].average_gross, month[8].average_drop, month[8].total_month_gross ],
      [10, month[9].total_month_gross, month[9].month_name, month[9].top_movie_title, month[9].top_movie_gross, month[9].percent_of_year, month[9].number_of_movies_released, month[9].average_gross, month[9].average_drop, month[9].total_month_gross ],
      [11, month[10].total_month_gross, month[10].month_name, month[10].top_movie_title, month[10].top_movie_gross, month[10].percent_of_year, month[10].number_of_movies_released, month[10].average_gross, month[10].average_drop, month[10].total_month_gross],
      [12, month[11].total_month_gross, month[11].month_name, month[11].top_movie_title, month[11].top_movie_gross, month[11].percent_of_year, month[11].number_of_movies_released, month[11].average_gross, month[11].average_drop, month[11].total_month_gross ]
    ];

    console.log(month_data[0])

    var months = ["", "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var formatMonth = function(d) {
      return months[d % 12];      
    }

    d3.select("#data_area").selectAll("svg").remove();

    var svg = d3.select("#data_area")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
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
              $( "#top_movie" ).text(e[3] + " - " + "$" + e[4] + " million")
              $( "#number_of_movies_released" ).text(e[6])
              $( "#total_month_gross" ).text("$" + e[9] + " million")
              $( "#average_gross" ).text("$" + e[7] + " million")
              $( "#average_drop" ).text( e[8] + "%")
              $( "#percent_of_year" ).text( e[5] + "%")
              top_movie = e[3]
              getMoviePoster(top_movie)
              d3.select(this)
              .attr("fill", "#69bd28");
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
      [1, month[0].total_month_gross, month[0].month_name, month[0].top_movie_title, month[0].top_movie_gross, month[0].percent_of_year, month[0].number_of_movies_released, month[0].average_gross, month[0].average_drop, month[0].total_month_gross ],
      [2, month[1].total_month_gross, month[1].month_name, month[1].top_movie_title, month[1].top_movie_gross, month[1].percent_of_year, month[1].number_of_movies_released, month[1].average_gross, month[1].average_drop, month[1].total_month_gross ],
      [3, month[2].total_month_gross, month[2].month_name, month[2].top_movie_title, month[2].top_movie_gross, month[2].percent_of_year, month[2].number_of_movies_released, month[2].average_gross, month[2].average_drop, month[2].total_month_gross ],
      [4, month[3].total_month_gross, month[3].month_name, month[3].top_movie_title, month[3].top_movie_gross, month[3].percent_of_year, month[3].number_of_movies_released, month[3].average_gross, month[3].average_drop, month[3].total_month_gross ],
      [5, month[4].total_month_gross, month[4].month_name, month[4].top_movie_title, month[4].top_movie_gross, month[4].percent_of_year, month[4].number_of_movies_released, month[4].average_gross, month[4].average_drop, month[4].total_month_gross ],
      [6, month[5].total_month_gross, month[5].month_name, month[5].top_movie_title, month[5].top_movie_gross, month[5].percent_of_year, month[5].number_of_movies_released, month[5].average_gross, month[5].average_drop, month[5].total_month_gross ],
      [7, month[6].total_month_gross, month[6].month_name, month[6].top_movie_title, month[6].top_movie_gross, month[6].percent_of_year, month[6].number_of_movies_released, month[6].average_gross, month[6].average_drop, month[6].total_month_gross ],
      [8, month[7].total_month_gross, month[7].month_name, month[7].top_movie_title, month[7].top_movie_gross, month[7].percent_of_year, month[7].number_of_movies_released, month[7].average_gross, month[7].average_drop, month[7].total_month_gross ],
      [9, month[8].total_month_gross, month[8].month_name, month[8].top_movie_title, month[8].top_movie_gross, month[8].percent_of_year, month[8].number_of_movies_released, month[8].average_gross, month[8].average_drop, month[8].total_month_gross ],
      [10, month[9].total_month_gross, month[9].month_name, month[9].top_movie_title, month[9].top_movie_gross, month[9].percent_of_year, month[9].number_of_movies_released, month[9].average_gross, month[9].average_drop, month[9].total_month_gross ],
      [11, month[10].total_month_gross, month[10].month_name, month[10].top_movie_title, month[10].top_movie_gross, month[10].percent_of_year, month[10].number_of_movies_released, month[10].average_gross, month[10].average_drop, month[10].total_month_gross],
      [12, month[11].total_month_gross, month[11].month_name, month[11].top_movie_title, month[11].top_movie_gross, month[11].percent_of_year, month[11].number_of_movies_released, month[11].average_gross, month[11].average_drop, month[11].total_month_gross ]
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

