var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input');
var lat = "";
var lon = "";
var searchHistory = document.querySelector('#citySearch');

function searchCitySubmit(event) {
  event.preventDefault();

  var city = searchInputVal.value;

  localStorage.setItem('searchCity', city);

  
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
      console.log(data) 
    })
        
      
    
  });


  
  
//   if (!city) {
//     console.error('Please enter a city!');
//     return;
//   }

//   var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  }

  // one call API : https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=imperial&exclude={part}&appid=d5c3f6289a5941c4842a8f2f928b3c55

  // GeoCoding API : http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid=d5c3f6289a5941c4842a8f2f928b3c55
  function init(){
    var cityList = localStorage.getItem('searchCity');
    console.log(cityList);

    searchHistory.innerHTML = "";

    var button = document.createElement("button");

    button.setAttribute("class", "btn");

    button.textContent = cityList;

    searchHistory.append(button);

  }

  init();


  function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=42.3584&lon=-71.0598&units=imperial&exclude=minutely,hourly,alerts&appid=d5c3f6289a5941c4842a8f2f928b3c55';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        console.log(data.current.temp);
        console.log(data.current.wind_speed);
        console.log(data.current.humidity);
        console.log(data.current.uvi);

        console.log(data.daily[0].temp.day);
        console.log(data.daily[0].wind_speed);
        console.log(data.daily[0].humidity);
        

        

      });

    }

searchFormEl.addEventListener('submit', searchCitySubmit);
searchFormEl.addEventListener('submit', getApi);

//example of fetch and create and append elements to page
// fetch(requestUrl)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
//   for (var i = 0; i < data.length; i++) {
//     var userName = document.createElement('h3');
//     var issueTitle = document.createElement('p');
//     userName.textContent = data[i].user.login;
//     issueTitle.textContent = data[i].title;
//     issueContainer.append(userName);
//     issueContainer.append(issueTitle);