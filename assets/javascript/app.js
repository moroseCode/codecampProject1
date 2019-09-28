// FUNCTIONS

// VARIABLES
var latitude;
var longitude;
var inputVal;
var sDate;
var eDate;
var lname;
var weatherData;
var activity;
var cityID;

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
    "mostly cloudy w/ snow" : "http://uds-static.api.aero/weather/icon/sm/44.png",
    "unavailable" : "assets/images/weatherUnavailable.jpg"
};

var defaultImages = {
    "default": "assets/images/defaultOutdoors.jpg",
    "golf": "assets/images/defaultGolf.jpg",
    "running": "assets/images/defaultRunning.jpg"
};

// Dropdown menu select activity
$(".dropdown-item").click(function () {
    activity = $(this).text().trim();
    $('#dropdown-input').val(activity);
});

// Listen for input in the Location field
$(function () {
    $('#city-input').on('input', function () {
        inputVal = $(this).val();
        if (inputVal == "Use my current location") {
            // HTML 5 GeoLocation API
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    // Get latitude and longitude from browser
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    $('#lat').text(latitude);
                    $('#long').text(longitude);

                    // Define GeoNames query URL to reverse geocode 
                    var geoNamesURL = 'https://secure.geonames.org/findNearbyPostalCodesJSON?lat=' + latitude + '&lng=' + longitude + '&username=bflatbader&maxRows=1'

                    // AJAX request
                    $.ajax({
                            url: geoNamesURL,
                            method: "GET"
                        })
                        // After data comes back from the request
                        .then(function (gnResults) {
                            latitude = gnResults.postalCodes[0].lat;
                            longitude = gnResults.postalCodes[0].lng;
                            city = gnResults.postalCodes[0].placeName;
                            $('#city-input').val(city);
                        });
                });
            }
        }
    });
});

(function () {
    // Configure Algolia Places API
    var placesAutocomplete = places({
        appId: 'plFMDJBLKKRN',
        apiKey: '1cb69f9d821db1d22c2375decf532784',
        container: document.querySelector('#city-input'),
        templates: {
            value: function (suggestion) {
                return suggestion.name;
            }
        }
    }).configure({
        countries: ['us'], // Search in the United States of America
        type: 'city' // Search only for cities names
    });
    // Get city data on selection from location autocomplete
    placesAutocomplete.on('change', function resultSelected(cityInfo) {
        latitude = cityInfo.suggestion.latlng.lat;
        longitude = cityInfo.suggestion.latlng.lng;
        console.log(cityInfo.suggestion);
    });
})();

// on click of the reset button clears search results
$("#reset").click(function () {
    $("#results").empty();
    $("#dropdown-input").val("");
    $("#city-input").val("");
    $("#startDate").val("");
    $("#endDate").val("");
});

// On click of the submit button
$("#submit").click(function () {
    sDate = $("#startDate").val();
    eDate = $("#endDate").val();



    // Get weather data
    var coordsUrl = "https://dataservice.accuweather.com/locations/v1/cities/search"
    var locLat = latitude //temp value needs to be a variable from the info from the stuff Bishop is using
    var locLon = longitude //same as above
    var coordsParams = {
        "apikey": "0AJTGemJpazvUYpRY1sAuD3oMlYV26EA",
        "q": locLat + "," + locLon
    }

    $.ajax({
        "url": coordsUrl,
        "method": "GET",
        "data": coordsParams
    }).then(function (response) {
        // Get City ID to get weather information
        cityID = response[0].Key
        console.log(cityID)
    }).then(function () {
        var weatherUrl = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityID
        var weatherParams = {
            "apikey": "alDalbGMtcCLkMBINAb9QZKLDnGdExK6",
            "details": "true"
        }
        // Get 5-day forecast
        $.ajax({
            "url": weatherUrl,
            "method": "GET",
            "data": weatherParams
        }).then(function (response) {
            weatherData = response.DailyForecasts;

        }).then(function () {
            // Active.com API
            // proxy required to get the active.com api to work properly
            jQuery.ajaxPrefilter(function (options) {
                if (options.crossDomain && jQuery.support.cors) {
                    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
                }
            });
            //start and end dates from the form on index.html -- must be in YYYY-MM-DD format
            var startDate = sDate; //temp date for testing, add proper date from index.html
            var endDate = eDate; //temp date for testing, add proper date from index.html

            //Active API
            var activeParams = {
                "api_key": "yfb8tzs47k5z8j9463emhphv",
                "query": activity, //temp value, would need to be from form on index. Requires OR if multiple search terms used
                "lat_lon": latitude + "," + longitude, //temp value
                "radius": "25", //temp value
                "start_date": startDate + ".." + endDate,
                "exclude_children": "true"
            }

            var queryURL = "http://api.amp.active.com/v2/search";

            $.ajax({
                url: queryURL,
                method: "GET",
                data: activeParams
            }).then(function (response) {
                var results = response.results;
                console.log(results);

                for (i = 0; i < results.length; i++) {
                    var eventName = results[i].assetName;
                    var description = results[i].assetDescriptions["0"].description;
                    var eventStart = results[i].activityStartDate;
                    var eventEnd = results[i].activityEndDate;
                    var eventDays = results[i].activityRecurrences["0"].days;
                    var streetAddress = results[i].place.addressLine1Txt;
                    var cityState = results[i].place.cityName + ", " + results[i].place.stateProvinceCode;
                    var zipcode = results[i].place.postalCode;
                    var eventsurl = results[i].registrationUrlAdr;
                    var topic = results[i].assetChannels["0"].channel.channelName.trim().toLowerCase().replace(/[^a-z0-9\s]/gi, ''); // replace special characters, which cause js errors to be thrown
                    var eventImage = results[i].logoUrlAdr;

                    // Format address for driving directions
                    var fullAddress = streetAddress + "," + cityState + "," + zipcode;
                    fullAddress = encodeURIComponent(fullAddress);
                    var mapsURL = " https://www.google.com/maps/place/" + fullAddress;
                    
                    // Format event start and end for display later
                    eventStart = moment(eventStart).format('MM/DD/YYYY hh:mm a');
                    eventEnd = moment(eventEnd).format('MM/DD/YYYY hh:mm a');

                    // Format event day for comparison to weather date
                    eventDay = moment(eventStart).format('MMDDYYYY');

                    // Check if topic is in the defaultImages object
                    if (Object.keys(defaultImages).indexOf(topic) < 1) {
                        // If not, set image to default
                        topic = "default";
                    }

                    // Determine what image to be used with event
                    if (eventImage) {
                        // Event has an image, check if it exists on Active.com
                        $.get(eventImage)
                            .done(function () {
                                // Image exists, don't need to do anything
                            }).fail(function () {
                                // Image doesn't exist, replace with default
                                console.log("Image doesn't exist");
                                eventImage = defaultImages["default"];
                            })

                    } else {
                        eventImage = defaultImages[topic];
                    }

                    // Determine if weather available
                    todaysDate = moment();
                    difference = moment(eventStart).diff(todaysDate, 'days');
                    // Difference is less than 5, get weather data
                    if ( difference < 5 ) {
                        for(w = 0; w < weatherData.length; w++) {
                            weatherDate = weatherData[w].Date;
                            weatherDate = moment(weatherDate).format('MMDDYYYY');
                            if (eventDay == weatherDate) {
                                var rainProb = weatherData[w].Day.RainProbability;
                                var minTemp = weatherData[w].Temperature.Minimum.Value;
                                var maxTemp =  weatherData[w].Temperature.Maximum.Value;
                                var weatherDescription = weatherData[w].Day.LongPhrase;
                                var iconPhrase = weatherData[w].Day.IconPhrase.trim().toLowerCase();

                                // Determine what weather icon to use
                                weatherIcon = weatherIcons[iconPhrase];
                            }
                        }
                    } else {
                        // Greater than 5 days out, no weather data
                        var rainProb = "n/a";
                        var minTemp = "n/a";
                        var maxTemp =  "n/a";
                        var weatherDescription = "Weather Unavailable - check back at a later date.";
                        weatherIcon = "";
                    }
               
                    // Unhide results div and jump down to that section
                    $('#results').removeClass("invisible");
                    $(document).scrollTop($("#results").offset().top);

                    // Setup card with event info
                    newEventCard = `
                    <div class="card mb-3 eventCards">
                    <div class="row no-gutters">
                        <div class="col-md-3">
                            <img src="${eventImage}" class="card-img">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">
                                <h5 id= "place" class="card-title">${eventName}</h5>
                                <p id = "location" class="card-text"><small class="text-muted event-muted"><i class="fas fa-map-marker-alt"></i>&nbsp;${streetAddress}, ${cityState}, ${zipcode}</small></p>
                                <p id="dates" class="card-text"><small class="text-muted event-muted"><i class="far fa-clock"></i>&nbsp;${eventStart} - ${eventEnd}</small></p>
                                <p id="days" class="card-text"><small class="text-muted event-muted">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${eventDays}</small></p>
                                <hr>
                                <p id="activity"class="card-text"><small class="text-muted">${description}</small></p>
                                <br>
                                <a href="${eventsurl}" class="btn btn-primary eventBtn" target="_blank">More Info</a>
                                <a href="${mapsURL}" class="btn btn-primary eventBtn" target="_blank"><i class="far fa-map"></i>&nbsp;Get Directions</a>
                            </div>
                        </div>
                        <div id="weather" class="col-md-3 text-center">
                            <img src="${weatherIcon}">
                            <p><small class="text-muted event-muted">${weatherDescription}</small></p>
                            <p><i class="fas fa-tint"></i>&nbsp;${rainProb}%</p>
                            <p><i class="fas fa-temperature-low"></i>&nbsp;${minTemp}&deg;</p>
                            <p><i class="fas fa-temperature-high"></i>&nbsp;${maxTemp}&deg;</p>
                        </div>
                    </div>
                    </div>
                    `;

                    $('#results').append(newEventCard);
                }
            });
        });
    });
});