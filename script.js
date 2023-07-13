 
const apiKey = "06babc6062789c8e21df029ef2c6b280";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherSection = document.querySelector(".weather");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  console.log(data);

  if (data.cod === "404") {
    // Error handling for invalid city name
    alert("City not found. Please enter a valid city name.");
    return;
  }

  cityElement.innerHTML = data.name;
  tempElement.innerHTML = Math.round(data.main.temp) + "°C";
  humidityElement.innerHTML = data.main.humidity + "%";
  windElement.innerHTML = data.wind.speed + "kmph";

  // Show weather section after fetching data
  weatherSection.style.display = "block";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
    searchBox.value = ""; // Clear the input field
  } else {
    alert("Please enter a city name.");
  }
});
