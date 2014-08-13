$(document).ready(function(){
getBarData();
alert("Hover over the dots for movie information!");

});
function getBarData(){
    $.ajax({
    url: '/bar',
    method: 'GET',
    dataType: 'json'
  }).done(function(bar_data){
    console.log(bar_data)

  })

};
