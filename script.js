var searchAirportEl = document.querySelector(".airport-container");
var searchHotelEl = document.querySelector(".hotel-container");
var airportUrl;
var destIdResult;
var arrivalDate;
var departureDate;
var hotelName;
var airportList = [];
var modalBg = document.querySelector(".modal-background");
var modal = document.querySelector(".modal");
var modalMsg = document.getElementById("Modal-Message");

function airportListEmpty(event) {
  event.preventDefault();
  var airportListEmpty = document.getElementById("airport-results");
  airportListEmpty.innerHTML = " ";
  checkAirports();
}

function checkAirports() {
  var destination = document.getElementById("destination-airport").value;
  console.log(destination);
  if (!destination) {
    console.log("Please enter the destination");
    return;
  }

  airportUrl = "https://api.api-ninjas.com/v1/airports?city=" + destination;

  fetch(airportUrl, {
    headers: { "X-Api-Key": "WswAb25ac3vvhIzq6bTAVg==AkiaAP2lWNnbRet7" },
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (airport) {
      console.log(airport);
      var names = []; //////////////////
      for (var i = 0; i < airport.length; i++) {   
        names.push(airport[i].name)
        }

        localStorage.setItem('portName', JSON.stringify(names));
        localStorage.getItem('portName');
        //////////////////works but cant display inner html
      document
        .getElementById("airport-results-container")
        .classList.add("show");

      if (airport.length === 0) {
        document
          .getElementById("airport-results-container")
          .classList.remove("show");

        modal.classList.add("is-active");
        modalMsg.innerHTML = "No Airports for the city entered!";
        modalBg.addEventListener("click", function () {
          modal.classList.remove("is-active");
        });
      }
      
      for (var i = 0; i < airport.length; i++) {
        if (airport[i].name.includes("Airport")) {
          airportList.push(airport[i]);
          
        }
      }
      for (var j = 0; j < airportList.length; j++) {
        console.log(airportList[j].name);
        var airportListItem = $(
          '<li style= "margin-top:10px;text-align: center">'
        );
        airportListItem.text(airportList[j].name);
        $("#airport-results").append(airportListItem);
      }
      airportList = [];
    });
}

function destId() {
  var hotelInTheCity = document.getElementById("destination-hotel").value;
  console.log(hotelInTheCity);

  if (!hotelInTheCity) {
    console.log("please enter the city to search hotel");
    return;
  }
  var destIdurl =
    "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=" +
    hotelInTheCity;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "505effbf24msh417b1aeaeb14b0ap1a3803jsne7b48bea444e",
      "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
    },
  };

  const response = fetch(destIdurl, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log(result)

      if (result.data.length === 0) {
        document
          .getElementById("hotel-results-container")
          .classList.remove("show");
        modal.classList.add("is-active");
        modalMsg.innerHTML =
          "No Hotels for the city entered!Please enter the correct city";
        modalBg.addEventListener("click", function () {
          modal.classList.remove("is-active");
        });
      }
      console.log(result);
      destIdResult = result.data[0].dest_id;
      console.log(destIdResult);
      checkHotels();
    });
}

function hotelsListEmpty(event) {
  event.preventDefault();

  document.getElementById("hotel-results-container").classList.add("show");

  var hotelListEmpty = document.getElementById("hotel-results");
  hotelListEmpty.innerHTML = " ";
  destId();
}

function checkHotels() {
  arrivalDate = document.getElementById("from").value;
  console.log(arrivalDate);
  departureDate = document.getElementById("to").value;
  console.log(departureDate);

  var hotelsUrl =
    "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=" +
    destIdResult +
    "&search_type=CITY&arrival_date=" +
    arrivalDate +
    "&departure_date=" +
    departureDate +
    "&page_number=1";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "505effbf24msh417b1aeaeb14b0ap1a3803jsne7b48bea444e",
      "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
    },
  };
  fetch(hotelsUrl, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      console.log(result);
      var myHotel = []; ////////////////////
      for (var i = 0; i < result.length; i++) {   
        myHotel.push(result[i].name)
        }

        localStorage.setItem('hotName', JSON.stringify(myHotel));
        localStorage.getItem('hotName'); //////////////////////

      for (var i = 0; i < 5; i++) {
        hotelName = result.data.hotels[i].property.name;
        console.log(hotelName);
        
        var hotelListItem = $(
          '<li style="list-style-type: none;margin-top:10px;text-align: center">'
        );
        hotelListItem.text(result.data.hotels[i].property.name);
        $("#hotel-results").append(hotelListItem);
      }
    });
}

$(function () {
  var dateFormat = "yy-mm-dd",
    from = $("#from")
      .datepicker({
        dateFormat: "yy-mm-dd",

        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
      })
      .on("change", function () {
        to.datepicker("option", "minDate", getDate(this));
      }),
    to = $("#to")
      .datepicker({
        dateFormat: "yy-mm-dd",

        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
      })
      .on("change", function () {
        from.datepicker("option", "maxDate", getDate(this));
      });

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  }
});

// Create checklist item from user input
function renderChecklist() {
  
  var li = document.createElement("li");
  var inputValue = document.getElementById("checklist-input").value;
  var task = document.createTextNode(inputValue);
  li.appendChild(task);
  if (inputValue === "") {
    return;
  } else {
    document.getElementById("checklist").appendChild(li);
  }
  document.getElementById("checklist-input").value = "";

  var span = document.createElement("SPAN");
  li.appendChild(span);

  // Create checkbox element for new list items

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";

  var label = document.createElement("label");
  label.class = "checkbox";
  label.htmlFor = "checkbox";
/*
  var clearButton = document.getElementById('clear-button');

  clearButton.addEventListener('click', function() {
    button.textContent = 'clear-button';
});*/

  li.prepend(checkbox, " ");
  li.prepend(label);
}

searchAirportEl.addEventListener("submit", airportListEmpty);
searchHotelEl.addEventListener("submit", hotelsListEmpty);

// Fetch the API data and store it in local storage
//var destination = document.getElementById("destination-airport").value;

/*
fetch('https://api.api-ninjas.com/v1/airports?city=' + destination, {headers: { "X-Api-Key": "WswAb25ac3vvhIzq6bTAVg==AkiaAP2lWNnbRet7" }})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.names);
    localStorage.setItem('airportNames', JSON.stringify(data.names));

    displayAirportNames();
  })
  .catch(error => console.error(error));*/

// Function to display the airport names from local storage
/*function displayAirportNames() {
  var airportList = document.getElementById("airportList");
  var airportNames = JSON.parse(localStorage.getItem('airportNames'));

  if (airportNames && airportNames.length > 0) {
    airportList.innerHTML = '';
    for (var i = 0; i < 6; i++) {
      var listItem = document.createElement("li");
      listItem.textContent = airportNames[i];
      airportList.appendChild(listItem);
    }
  } else {
    airportList.innerHTML = 'No airport names available.';
  }
}*/


/*
function displayResults() {
  var li = document.createElement('li');
  li.textContent = '';
}*/

/*
// Make API call to retrieve search results
function searchAPI() {
  // Your code to make API call and retrieve search results goes here

  // Example code to store search results in an array
  const searchResults = ['Result 1', 'Result 2', 'Result 3', 'Result 4', 'Result 5', 'Result 6'];

  // Save search results in local storage
  localStorage.setItem('searchResults', JSON.stringify(searchResults));
}

// Function to display search history from local storage
function displaySearchHistory() {
  // Get search results from local storage
  const searchResults = localStorage.getItem('searchResults');

  // Check if search results exist in local storage
  if (searchResults) {
    const searchResultsArray = JSON.parse(searchResults);

    // Create list items dynamically for each search result
    const searchHistoryList = document.getElementById('searchHistory');

    searchResultsArray.forEach(result => {
      const listItem = document.createElement('li');
      listItem.textContent = result;
      searchHistoryList.appendChild(listItem);
    });
  }
}

// Function to clear search history from local storage
function clearSearchHistory() {
  // Clear search results from local storage
  localStorage.removeItem('searchResults');

  // Clear search history list in HTML
  document.getElementById('searchHistory').innerHTML = '';
}

// Call the displaySearchHistory function on page load to show search history
document.addEventListener('DOMContentLoaded', displaySearchHistory); */