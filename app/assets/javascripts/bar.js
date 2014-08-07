$(document).ready(function(){
getBarData()

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
