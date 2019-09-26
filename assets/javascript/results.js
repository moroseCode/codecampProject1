$(document).ready(function(){
    var strDate = window.localStorage.getItem('stDate');
    var e_Date = window.localStorage.getItem('enDate');
    var forcast = window.localStorage.getItem('weather');
    var address = window.localStorage.getItem('location');
    var event = window.localStorage.getItem('activity');

    $('#place').append();
    $('#location').append(address);
    $('#dates').append(strDate + " - " + e_Date);
    $('#activity').append(event);
    $('#weather').append(forcast);

})
