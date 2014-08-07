$(document).ready(function(){
getBarData();
alert("I am an alert box!");

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
