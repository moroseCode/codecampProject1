// FUNCTIONS

// VARIABLES
var latitude;
var longitude;
var inputVal;
var sDate;
var eDate;
var lname;
var weatherResponse;
var geoResponse;
var activityResponse;

// Listen for input in the Location field
$(function() {
    $('#city-input').on('input',function() {
        inputVal = $(this).val();
        if (inputVal == "Use my current location") {
            // HTML 5 GeoLocation API
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
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
                    .then(function(gnResults) {
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

(function() {
    // Configure Algolia Places API
    var placesAutocomplete = places({
        appId: 'plFMDJBLKKRN',
        apiKey: '1cb69f9d821db1d22c2375decf532784',
        container: document.querySelector('#city-input'),
        templates: {
        value: function(suggestion) { return suggestion.name; }
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

  $("#submit").click(function(){
    sDate = $("#startDate").val();
    eDate = $("#endDate").val();
   
     // setting global variable for the city ID used in the location
     var cityID = "";
     // proxy required to get the active.com api to work properly
     jQuery.ajaxPrefilter(function(options) {
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
         "query":    "golf", //temp value, would need to be from form on index. Requires OR if multiple search terms used
         "lat_lon": latitude + "," + longitude, //temp value
         "radius": "25", //temp value
         "start_date": startDate + ".." + endDate
     }
     
     var queryURL = "http://api.amp.active.com/v2/search";
     
    $.ajax({
         url: queryURL,
         method: "GET",
         data: activeParams
         }).then(function(response) {
         var results = response.results;
         // throwaway variable to cut down on typing.
         // throwaway variable to cut down on typing
        //  var recurrences = testResult.activityRecurrences[0]
         console.log(results);
         // event title
        //  console.log(testResult.assetComponents["0"].assetName)
        //  description including html tags
        //  console.log(testResult.assetDescriptions["0"].description)
         // registration url
        //  console.log(testResult.registrationUrlAdr)
         // start date
        //  console.log(recurrences.activityStartDate)
         // end date
        //  console.log(recurrences.activityEndDate)
         // frequency of event
        //  console.log(recurrences.frequency.frequencyName)
         // street address of event
        //  console.log(testResult.place.addressLine1Txt)
         //city and state of event
        //  console.log(testResult.place.cityName + ", " + testResult.place.stateProvinceCode)
         // zip code of event
        //  console.log(testResult.place.postalCode)
         // organization hosting the event
        //  console.log(testResult.organization.organizationName)
         // organization phone number
        //  console.log(testResult.organization.primaryContactPhone)
        for(i = 0; i < results.length; i++){
            var eventName = results[i].assetName;
            var description = results[i].assetDescriptions["0"].description;
            var eventStart = results[i].activityStartDate;
            var eventEnd = results[i].activityEndDate;
            var streetAddress = results[i].place.addressLine1Txt;
            var cityState = results[i].place.cityName + ", " + results[i].place.stateProvinceCode;
            var zipcode = results[i].place.postalCode;
            var eventsurl = results[i].registrationUrlAdr;
            
            console.log(eventName);
            console.log(description);
            console.log(eventStart);
            console.log(streetAddress);
            console.log(cityState);
            console.log(zipcode);
            console.log(eventsurl);
        }
    });
         
    //  var coordsUrl = "https://dataservice.accuweather.com/locations/v1/cities/search"
    //  var locLat = latitude //temp value needs to be a variable from the info from the stuff Bishop is using
    //  var locLon = longitude //same as above
    //  var coordsParams = {
    //      "apikey": "0AJTGemJpazvUYpRY1sAuD3oMlYV26EA",
    //      "q": locLat + "," + locLon
    //  }
 
    //  $.ajax({
    //      "url": coordsUrl,
    //      "method": "GET",
    //      "data": coordsParams
    //  }).then(function (response) {
    //      console.log(response[0].Key)
    //      cityID = response[0].Key
         
    //      console.log(cityID)
    //  }).then(function(){
    //      var weatherUrl = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityID
    //      var weatherParams = {
    //          "apikey": "alDalbGMtcCLkMBINAb9QZKLDnGdExK6",
    //          "details": "true"
    //      }
 
    //      $.ajax({
    //          "url": weatherUrl,
    //          "method": "GET",
    //          "data": weatherParams
    //      }).then(function (response) {
    //          console.log(response.DailyForecasts)
    //          for(var i = 0; i < (response.DailyForecasts).length; i++){
    //              var weathDay = response.DailyForecasts[i]
    //              // pretty sure we are going to need to use the unicode for the percent sign to have it render properly on the actual page
    //              console.log("Rain Probability: " + weathDay.Day.RainProbability + "%");
    //              console.log("Low: " + weathDay.Temperature.Minimum.Value)
    //              console.log("High: " + weathDay.Temperature.Maximum.Value)
    //              // the phrase to include with the icon and temperatures
    //              console.log(weathDay.Day.LongPhrase)
    //              // phrase to use to select the proper icon for weather
    //              console.log(weathDay.Day.IconPhrase)
    //              console.log("--------------------------")
    //          }
    //      });
    //  });

    
    
  })
  