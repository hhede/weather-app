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

   parisLink.classList.remove("chosen");
  londonLink.classList.remove("chosen");
  newYorkLink.classList.remove("chosen");
  melbourneLink.classList.remove("chosen");
  tokyoLink.classList.remove("chosen");
}

//show weather = all the weather information
function getForecast(coordinates) {
  let apiKey = "0535f1f4c0803628dc00fea0a7af0bb0";
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  
  let date = document.querySelector("#date");
  date.innerHTML = `${day} ${hour}:${minute}`;

  let descriptionDiv = document.querySelector("#description");
  let description = response.data.weather[0].description;
  descriptionDiv.innerHTML = description;

  let h2 = document.querySelector("#city");
  h2.innerHTML = `${response.data.name}`;

  feelingTemperature = response.data.main.feels_like;

  let feelingDiv = document.querySelector("#feeling");
  let feeling = Math.round(response.data.main.feels_like);
  feelingDiv.innerHTML = `Feels like: ${feeling}°C`;

  celsiusTemperature = response.data.main.temp;

  let weatherDiv = document.querySelector("#weather");
  let temperature = Math.round(celsiusTemperature);
  weatherDiv.innerHTML = `${temperature}°C`;
  
  let windDiv = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windDiv.innerHTML = `Wind: ${wind} m/s`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
iconElement.setAttribute("alt", response.data.weather[0].description);

let humidityElement = document.querySelector("#humidity");
let humidity = response.data.main.humidity;
humidityElement.innerHTML = `Humidity: ${humidity}%`;

getForecast(response.data.coord);
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

   parisLink.classList.remove("chosen");
  londonLink.classList.remove("chosen");
  newYorkLink.classList.remove("chosen");
  melbourneLink.classList.remove("chosen");
  tokyoLink.classList.remove("chosen");
}
let locationButton = document.querySelector(".current-button");
locationButton.addEventListener("click", getCurrentPosition);

// fahrenheit / celsius conversion

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  
  let weatherDiv = document.querySelector("#weather");
  let fTemp = Math.round(fahrenheitTemperature);
  weatherDiv.innerHTML = `${fTemp}°F`;

   let feelingFahrenheitTemperature = (feelingTemperature * 9) / 5 + 32;
   let feelingFDiv = document.querySelector("#feeling");
   let feelingFTemp = Math.round(feelingFahrenheitTemperature);
  feelingFDiv.innerHTML = `Feels like: ${feelingFTemp}°F`;
}


function showCelsiusTemperature(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let weatherDiv = document.querySelector("#weather");
  let cTemp = Math.round(celsiusTemperature);
  weatherDiv.innerHTML = `${cTemp}°C`;

  let feelingDiv = document.querySelector("#feeling");
  let feelingCTemp = Math.round(feelingTemperature);
  feelingDiv.innerHTML = `Feels like: ${feelingCTemp}°C`;
}

let feelingTemperature = null;

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);


// Popular searches
function showParisWeather(event) {
  event.preventDefault();

  parisLink.classList.add("chosen");
  londonLink.classList.remove("chosen");
  newYorkLink.classList.remove("chosen");
  melbourneLink.classList.remove("chosen");
  tokyoLink.classList.remove("chosen");

  let units = "metric";
  let apiKey = "0535f1f4c0803628dc00fea0a7af0bb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let parisLink = document.querySelector("#paris-link");
parisLink.addEventListener("click", showParisWeather);


function showLondonWeather(event) {
  event.preventDefault();

  parisLink.classList.remove("chosen");
  londonLink.classList.add("chosen");
  newYorkLink.classList.remove("chosen");
  melbourneLink.classList.remove("chosen");
  tokyoLink.classList.remove("chosen");

  let units = "metric";
  let apiKey = "0535f1f4c0803628dc00fea0a7af0bb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let londonLink = document.querySelector("#london-link");
londonLink.addEventListener("click", showLondonWeather)

function showNewYorkWeather(event) {
  event.preventDefault();

  parisLink.classList.remove("chosen");
  londonLink.classList.remove("chosen");
  newYorkLink.classList.add("chosen");
  melbourneLink.classList.remove("chosen");
  tokyoLink.classList.remove("chosen");

  let units = "metric";
  let apiKey = "0535f1f4c0803628dc00fea0a7af0bb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=new york&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let newYorkLink = document.querySelector("#new-york-link");
newYorkLink.addEventListener("click", showNewYorkWeather)

function showMelbourneWeather(event) {
  event.preventDefault();

   parisLink.classList.remove("chosen");
  londonLink.classList.remove("chosen");
  newYorkLink.classList.remove("chosen");
  melbourneLink.classList.add("chosen");
  tokyoLink.classList.remove("chosen");

  let units = "metric";
  let apiKey = "0535f1f4c0803628dc00fea0a7af0bb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=melbourne&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let melbourneLink = document.querySelector("#melbourne-link");
melbourneLink.addEventListener("click", showMelbourneWeather)

function showTokyoWeather(event) {
  event.preventDefault();

   parisLink.classList.remove("chosen");
  londonLink.classList.remove("chosen");
  newYorkLink.classList.remove("chosen");
  melbourneLink.classList.remove("chosen");
  tokyoLink.classList.add("chosen");

  let units = "metric";
  let apiKey = "0535f1f4c0803628dc00fea0a7af0bb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let tokyoLink = document.querySelector("#tokyo-link");
tokyoLink.addEventListener("click", showTokyoWeather)


// weather forecast for the 5 next days 

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [ "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"];

return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
          <span class="forecast-date">
          <h4>
            ${formatDay(forecastDay.dt)}
          </4>
          <h5 class="rounded-pill">
            ${Math.round(forecastDay.temp.day)}°C <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="32"/>
            <br />
            <span class="weather-forecast-wind">
              ${Math.round(forecastDay.temp.night)}°C <i class="far fa-moon"></i>
            </span>
          </h5>
          </span>
        </div>
`;
    }
    
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  let forecastElement2 = document.querySelector("#forecast2");
  let forecastHTML2 = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 3) {
      forecastHTML2 =
        forecastHTML2 +
        `<div class="col">
          <span class="forecast-date">
          <h4>
            ${formatDay(forecastDay.dt)}
          </4>
           <h5 class="rounded-pill">
            ${Math.round(forecastDay.temp.day)}°C <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="32"/>
            <br />
            <span class="weather-forecast-wind">
              ${Math.round(forecastDay.temp.night)}°C <i class="far fa-moon"></i>
            </span>
          </h5>
          </span>`
           
;
    }
  });
  forecastHTML2 = forecastHTML2 + `</div>`;
  forecastElement2.innerHTML = forecastHTML2;
}


// default city
searchCity("New York");