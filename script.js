var searchAirportEl = document.querySelector(".airport-container");
var airportUrl;

function checkAirports(event) {
  event.preventDefault();
  var destination = document.getElementById("destination-field").value;
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
}
console.log(searchAirportEl);
searchAirportEl.addEventListener("submit", checkAirports);

$( function() {
  var dateFormat = "mm/dd/yy",
    from = $( "#from" )
      .datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1
      })
      .on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
      }),
    to = $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1
    })
    .on( "change", function() {
      from.datepicker( "option", "maxDate", getDate( this ) );
    });

  function getDate( element ) {
    var date;
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }

    return date;
  }
} );

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    return;
  } else {
    document.getElementById("checklist-items").appendChild(li);
  }
  document.getElementById("checklist-input").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}