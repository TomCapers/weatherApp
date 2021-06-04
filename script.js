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

searchFormEl.addEventListener('submit', searchCitySubmit);