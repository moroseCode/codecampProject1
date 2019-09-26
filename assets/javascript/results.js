// VARIABLES
var weatherIcons = {
    "sunny" : "http://uds-static.api.aero/weather/icon/sm/01.png",
    "mostly sunny" : "http://uds-static.api.aero/weather/icon/sm/02.png",
    "partly sunny" : "http://uds-static.api.aero/weather/icon/sm/03.png",
    "intermittent clouds" : "http://uds-static.api.aero/weather/icon/sm/04.png",
    "hazy sunshine" : "http://uds-static.api.aero/weather/icon/sm/05.png",
    "mostly cloudy" : "http://uds-static.api.aero/weather/icon/sm/06.png",
    "cloudy" : "http://uds-static.api.aero/weather/icon/sm/07.png",
    "dreary" : "http://uds-static.api.aero/weather/icon/sm/08.png",
    "fog" : "http://uds-static.api.aero/weather/icon/sm/11.png",
    "showers" : "http://uds-static.api.aero/weather/icon/sm/12.png",
    "mostly cloudy w/ showers" : "http://uds-static.api.aero/weather/icon/sm/13.png",
    "partly sunny w/ showers" : "http://uds-static.api.aero/weather/icon/sm/14.png",
    "t-storms" : "http://uds-static.api.aero/weather/icon/sm/15.png",
    "mostly cloudy w/ t-storms" : "http://uds-static.api.aero/weather/icon/sm/16.png",
    "partly sunny w/ t-storms" : "http://uds-static.api.aero/weather/icon/sm/17.png",
    "rain" : "http://uds-static.api.aero/weather/icon/sm/18.png",
    "flurries" : "http://uds-static.api.aero/weather/icon/sm/19.png",
    "mostly cloudy w/ flurries" : "http://uds-static.api.aero/weather/icon/sm/20.png",
    "partly sunny w/ flurries" : "http://uds-static.api.aero/weather/icon/sm/21.png",
    "snow" : "http://uds-static.api.aero/weather/icon/sm/22.png",
    "mostly cloudy w/ snow" : "http://uds-static.api.aero/weather/icon/sm/23.png",
    "ice" : "http://uds-static.api.aero/weather/icon/sm/24.png",
    "sleet" : "http://uds-static.api.aero/weather/icon/sm/25.png",
    "freezing rain" : "http://uds-static.api.aero/weather/icon/sm/26.png",
    "rain and snow" : "http://uds-static.api.aero/weather/icon/sm/29.png",
    "hot" : "http://uds-static.api.aero/weather/icon/sm/30.png",
    "cold" : "http://uds-static.api.aero/weather/icon/sm/31.png",
    "windy" : "http://uds-static.api.aero/weather/icon/sm/32.png",
    "clear" : "http://uds-static.api.aero/weather/icon/sm/33.png",
    "mostly clear" : "http://uds-static.api.aero/weather/icon/sm/34.png",
    "partly cloudy" : "http://uds-static.api.aero/weather/icon/sm/35.png",
    "intermittent clouds" : "http://uds-static.api.aero/weather/icon/sm/36.png",
    "hazy moonlight" : "http://uds-static.api.aero/weather/icon/sm/37.png",
    "mostly cloudy" : "http://uds-static.api.aero/weather/icon/sm/38.png",
    "partly cloudy w/ showers" : "http://uds-static.api.aero/weather/icon/sm/39.png",
    "mostly cloudy w/ showers" : "http://uds-static.api.aero/weather/icon/sm/40.png",
    "partly cloudy w/ t-storms" : "http://uds-static.api.aero/weather/icon/sm/41.png",
    "mostly cloudy w/ flurries" : "http://uds-static.api.aero/weather/icon/sm/43.png",
    "mostly cloudy w/ snow" : "http://uds-static.api.aero/weather/icon/sm/44.png"
};

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
