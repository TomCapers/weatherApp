var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input');
var lat = "";
var lon = "";
var searchHistory = document.querySelector('#citySearch');
var currentEl = document.querySelector('#current');
var dailyEl = document.querySelector('#fiveDay');
var day = new Date();
var cities = [];

function clearContent(clear) { //function to clear results from previous search
  while(clear.firstChild) {
      clear.removeChild(clear.firstChild);
  }
}


function searchCitySubmit(event) {
  event.preventDefault();

  clearContent(currentEl);
  clearContent(dailyEl);

  var city = searchInputVal.value;
  cities.push(city);
  localStorage.setItem('searchCity', JSON.stringify(cities));

  
  console.log(city);

  var geoCodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=d5c3f6289a5941c4842a8f2f928b3c55';
  
  fetch(geoCodingUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
       
      console.log(data[0].lat);
      console.log(data[0].lon);
      
      lat = data[0].lat;
      lon = data[0].lon;
      var oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=d5c3f6289a5941c4842a8f2f928b3c55';

    fetch(oneCallUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentDay = document.createElement ('div');

      var cityName = document.createElement ('h2');
      cityName.textContent = city

      var date = document.createElement('h3');
      date.textContent = ` (${day.getMonth() + 1}/${day.getDate()}/${day.getFullYear()})`

      console.log(data)
      var currentTemp = document.createElement ('p');
      currentTemp.textContent = "Temp:" + data.current.temp;
      var currentWind = document.createElement ('p');
      currentWind.textContent = "Wind:" + data.current.wind_speed + "mph";
      var currentHumidity = document.createElement ('p');
      currentHumidity.textContent = "Humidity" + data.current.humidity + "%";
      var currentUv = document.createElement ('p');
      currentUv.textContent = "UV Index:" + data.current.uvi;

      currentEl.appendChild(currentDay);
      currentDay.appendChild(cityName);
          
      currentDay.appendChild(date)
      currentDay.appendChild(currentTemp);
      currentDay.appendChild(currentWind);
      currentDay.appendChild(currentHumidity);
      currentDay.appendChild(currentUv);

      for (var i = 0; i < 5 ; i++) {
        day.setDate(day.getDate() +1);
        var fiveDay = document.createElement('div');
        fiveDay.className = "fiveDay";

        var forecastDay = document.createElement('p');
        forecastDay.textContent = ` (${day.getMonth() + 1}/${day.getDate()}/${day.getFullYear()})`
        var forecastIcon = document.createElement('p');
        forecastIcon.textContent = data.daily[i].weather[0].main;
        var forecastTemp = document.createElement('p');
        forecastTemp.textContent = "Temp:" + data.daily[i].temp.day
        var forecastWind = document.createElement('p');
        forecastWind.textContent = "Wind:" + data.daily[i].wind_speed + "mph"
        var forecastHumidity = document.createElement('p');
        forecastHumidity.textContent = "Humidity" + data.daily[i].humidity + "%";

        

        fiveDay.appendChild(forecastDay);
        fiveDay.appendChild(forecastIcon);
        fiveDay.appendChild(forecastTemp);
        fiveDay.appendChild(forecastWind);
        fiveDay.appendChild(forecastHumidity);

        dailyEl.appendChild(fiveDay);

      }

    
    })
        
      
    
  });
  }

 
  function init(){
    var cityList = JSON.parse(localStorage.getItem('searchCity'));
    console.log(cityList);

    searchHistory.innerHTML = "";

    for (var i = 0; i < cityList.length ; i++){
    var button = document.createElement("button");

    button.setAttribute("class", "btn");

    button.textContent = cityList;

    searchHistory.append(button);
    }

  }

  init();




searchFormEl.addEventListener('submit', searchCitySubmit);
