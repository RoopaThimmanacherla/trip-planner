var searchAirportEl = document.querySelector(".airport-container");
var searchHotelEl = document.querySelector(".hotel-container");
var airportUrl;
var destIdResult;
var arrivalDate;
var departureDate;
var hotelName;
var airportList = [];

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
      for (var i = 0; i < airport.length; i++) {
        if (airport[i].name.includes("Airport")) {
          airportList.push(airport[i]);
          console.log(airportList);
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
      console.log(result);
      destIdResult = result.data[0].dest_id;
      console.log(destIdResult);
      checkHotels();
    });
}

function hotelsListEmpty(event) {
  event.preventDefault();

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
searchAirportEl.addEventListener("submit", airportListEmpty);
searchHotelEl.addEventListener("submit", hotelsListEmpty);

// Create checklist item from user input

function renderChecklist() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("checklist-input").value;
  var task = document.createTextNode(inputValue);
  li.appendChild(task);
  if (inputValue === '') {
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

  li.prepend(checkbox, ' ');
  li.prepend(label);
}
