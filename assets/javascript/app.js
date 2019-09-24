// FUNCTIONS

// VARIABLES
var latitude;
var longitude;
var inputVal;

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