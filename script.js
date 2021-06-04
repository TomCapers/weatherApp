var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input');

function searchCitySubmit(event) {
  event.preventDefault();

  var city = searchInputVal.value;

  console.log(city);
  
//   if (!city) {
//     console.error('Please enter a city!');
//     return;
//   }

//   var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  }

  function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&CA&appid=d5c3f6289a5941c4842a8f2f928b3c55';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });

    }

searchFormEl.addEventListener('submit', searchCitySubmit);
searchFormEl.addEventListener('submit', getApi);