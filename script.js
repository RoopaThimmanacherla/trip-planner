var searchAirportEl = document.getElementById("search-airport");
var airportUrl;

function checkAirports(event) {
  console.log("welcome");
  var destination = document.getElementById("destination-field").value;
  console.log(destination);
  if (!destination) {
    console.log("Please enter the destination");
    return;
  }

  airportUrl = "https://api.api-ninjas.com/v1/airports?city=" + destination;

  fetch(airportUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      response.json();
    })
    .then(function (airport) {
      console.log(airport);
    });
}
searchAirportEl.addEventListener("submit", checkAirports);
