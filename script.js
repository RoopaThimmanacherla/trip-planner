var searchAirportEl = document.querySelector(".airport-container");
var searchHotelEl = document.querySelector(".hotel-container");
var airportUrl;
var destIdResult;
var arrivalDate;
var departureDate;

function checkAirports(event) {
  event.preventDefault();
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
    });
  console.log(searchAirportEl);
}

function destId(event) {
  event.preventDefault();
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
      console.log(result);
      destIdResult = result.data[0].dest_id;
      console.log(destIdResult);
      checkHotels();
    });
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
    });
}
searchAirportEl.addEventListener("submit", checkAirports);
searchHotelEl.addEventListener("submit", destId);

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
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("checklist-input").value;
  var task = document.createTextNode(inputValue);
  li.appendChild(task);
  if (inputValue === '') {
    return;
  } else {
    document.getElementById("checklist-items").appendChild(li);
  }
  document.getElementById("checklist-input").value = "";

  var span = document.createElement("SPAN");
  li.appendChild(span);
}

