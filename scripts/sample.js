// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

// API URL for Trier, Germany weather data
const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=49.75270568753302&lon=6.636055403198813&units=metric&appid=ff20cd3c9edcd5423d77d6d600dc9939";

// Function to display weather results
function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const desc = data.weather[0].description;

  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", desc);
  captionDesc.textContent = desc;
}

// Asynchronous function to fetch weather data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();
