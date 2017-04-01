/* global $*/
$(document).ready(function() {
  var latitude = "";
  var longitude = "";
  var loc = "";
  var tempUnits = "F";
  
  // IP address is used to get LAT, LONG, and location
  $.getJSON("http://ip-api.com/json", function(ipa) {
    latitude = ipa.lat;
    longitude = ipa.lon;
    loc = ipa.city + ", " + ipa.region + ", " + ipa.country;
    $("#location").html(loc);
    
    // access local weather with openweathermap.org api
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude +
    "&lon=" + longitude + "&APPID=a230b9f3910d2558926832c340311381&units=imperial", function(result) {
      var temperature = result.main.temp;
      var weather = result.weather[0].main;
      var weatherStatus = result.weather[0].description;
      $("#temperature").html(Math.round(temperature) + "°" + tempUnits);
      $("#weather").html(weather);
      $("#status").html(weatherStatus);
      
      // toggle between Fahrenheit and Celsius
      $("#units").click(function() {
        if (tempUnits === "F") {
          tempUnits = "C";
          temperature = (temperature - 32) * (5 / 9);
        } else {
          tempUnits = "F";
          temperature = (temperature * (9 / 5)) + 32;
        }
        $("#temperature").html(Math.round(temperature) + "°" + tempUnits);
      });
    });
  });
});
