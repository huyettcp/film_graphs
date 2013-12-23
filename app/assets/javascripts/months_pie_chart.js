$(document).ready(function(){
    $('#month_pie').on('click', function(){
        var year = parseInt($('input[name=year]:checked').val())
        monthPie(year);
    })

  

});

function monthPie(year){
    $.ajax({
        url: '/month_pie',
        data: {year: year},
        method: 'GET',
        dataType: 'json'
    }).done(function(month){
    var w = 400,                        //width
    h = 400,                            //height
    r = 200,                            //radius
    color = d3.scale.category20c();     //builtin range of colors
 
    data = [
            {"label":"Jan", "value":month[0].total_month_gross}, 
            {"label":"Feb", "value":month[1].total_month_gross}, 
            {"label":"Mar", "value":month[2].total_month_gross},
            {"label":"Apr", "value":month[3].total_month_gross},
            {"label":"May", "value":month[4].total_month_gross},
            {"label":"Jun", "value":month[5].total_month_gross},
            {"label":"Jul", "value":month[6].total_month_gross},
            {"label":"Aug", "value":month[7].total_month_gross},
            {"label":"Sep", "value":month[8].total_month_gross},
            {"label":"Oct", "value":month[9].total_month_gross},
            {"label":"Nov", "value":month[10].total_month_gross},
            {"label":"Dec", "value":month[11].total_month_gross},
            ];
    
    var vis = d3.select("#pie_area")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius
 
    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);
 
    var pie = d3.layout.pie()   
        .sort(null)        //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
 
    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
 
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
 
        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")                          //center the text on it's origin
            .text(function(d, i) { return data[i].label; });  
            })
};






