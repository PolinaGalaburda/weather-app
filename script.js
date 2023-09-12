"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = "eb990c5a519f2d0162fe1d11a20c1343";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const form = document.querySelector("form");
  const input = document.querySelector('input[type="text"]');
  const message = document.querySelector(".msg");
  const citiesList = document.querySelector(".cities");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const cityName = input.value.trim();
    if (!cityName) {
      message.textContent = "Please enter a city name!";
      input.focus();
      return;
    }

    getWeather(cityName);
  });

  function getWeather(city) {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        displayWeather(response.data);
      })
      .catch((error) => {
        // Axios помилки знаходяться в error.response.data
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Failed to fetch weather data. Please check the city name and try again.";
        message.textContent = errorMessage;
      });
  }

  function displayWeather(data) {
    citiesList.innerHTML = "";

    const li = document.createElement("li");
    li.classList.add("city-block");

    const cityElement = document.createElement("div");
    cityElement.textContent = `${data.name}`;

    const countryElement = document.createElement("span");
    countryElement.textContent = `${data.sys.country}`;
    countryElement.classList.add("country-code");

    cityElement.appendChild(countryElement);
    li.appendChild(cityElement);

    const tempElement = document.createElement("div");
    tempElement.textContent = `${data.main.temp}°C`;
    li.appendChild(tempElement);

    const imgElement = document.createElement("img");
    imgElement.setAttribute(
      "src",
      `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`
    );
    imgElement.setAttribute("alt", data.weather[0].description);
    li.appendChild(imgElement);

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("description");
    descriptionElement.textContent = data.weather[0].description;
    li.appendChild(descriptionElement);

    citiesList.appendChild(li);

    input.value = "";
    message.textContent = "";
  }
});
