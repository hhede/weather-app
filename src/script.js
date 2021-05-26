// date and time 
let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let date = document.querySelector("#date");
date.innerHTML = `${day} ${hour}:${minute}`;


// search function
function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#inputCity");
  let citySearh = document.querySelector("h2");
  inputCity.innerHTML = `${citySearh.value}`;
  searchCity(inputCity.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function searchCity(city) {
  let units = "metric";
  let apiKey = "0535f1f4c0803628dc00fea0a7af0bb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

//show weather

function showWeather(response) {
console.log(response.data);

  let date = document.querySelector("#date");
  date.innerHTML = `${day} ${hour}:${minute}`;

  let descriptionDiv = document.querySelector("#description");
  let description = response.data.weather[0].description;
  descriptionDiv.innerHTML = description;

  let h2 = document.querySelector("#city");
  h2.innerHTML = `${response.data.name}`;

  let feelingDiv = document.querySelector("#feeling");
  let feeling = Math.round(response.data.main.feels_like);
  feelingDiv.innerHTML = `Feels like: ${feeling}°C`;

  let nightTimeDiv = document.querySelector("#nightTime");
  let nightTime = Math.round(response.data.main.temp_night);
  nightTimeDiv.innerHTML = `${nightTime}°C`;

  let weatherDiv = document.querySelector("#weather");
  let temperature = Math.round(response.data.main.temp);
  weatherDiv.innerHTML = `${temperature}°C`;
  
  let windDiv = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windDiv.innerHTML = `Wind: ${wind} m/s`;
}

// show current position 

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0535f1f4c0803628dc00fea0a7af0bb0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector(".current-button");
locationButton.addEventListener("click", getCurrentPosition);
