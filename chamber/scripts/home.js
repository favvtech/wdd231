// Home Page JavaScript - Weather API and Dynamic Spotlights

(function () {
  "use strict";

  // Configuration - uses config.js or defaults
  const config = window.ChamberConfig || {};
  const WEATHER_API_KEY =
    config.WEATHER_API_KEY || "ff20cd3c9edcd5423d77d6d600dc9939";
  const MEMBERS_URL = config.MEMBERS_URL || "./data/members.json";

  // Select HTML elements that will be manipulated
  const weatherGrid = document.querySelector(".weather-grid");
  const spotlightsGrid = document.querySelector(".spotlights-grid");
  const weatherSection = document.querySelector(".weather-section");
  const spotlightsSection = document.querySelector(".company-spotlights");

  // Chamber locations with updated coordinates
  const CHAMBER_LOCATIONS = [
    { name: "Lagos", lat: 6.523469700646201, lon: 3.3773211024396677 },
  ];

  // Weather API Functions
  async function apiFetch(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    console.log("Fetching weather from:", url);

    try {
      const response = await fetch(url);

      console.log("Weather API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Weather API error response:", errorText);
        throw new Error(`Weather API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Weather data received:", data);
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }

  function getWeatherIcon(iconCode) {
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[iconCode] || "🌤️";
  }

  function createWeatherCard(location, weatherData) {
    if (!weatherData) {
      // Fallback data for when API fails
      const fallbackData = {
        Lagos: {
          temp: 28,
          description: "Partly Cloudy",
          humidity: 78,
          wind: 12,
          icon: "02d",
        },
        Kaduna: {
          temp: 32,
          description: "Sunny",
          humidity: 45,
          wind: 8,
          icon: "01d",
        },
      };

      const fallback = fallbackData[location.name] || {
        temp: 25,
        description: "Clear",
        humidity: 60,
        wind: 10,
        icon: "01d",
      };

      return `
        <div class="weather-card">
          <div class="weather-header">
            <h3>${location.name}</h3>
            <div class="weather-icon">${getWeatherIcon(fallback.icon)}</div>
          </div>
          <div class="weather-details">
            <div class="temperature">${fallback.temp}°C</div>
            <div class="condition">${fallback.description}</div>
            <div class="humidity">Humidity: ${fallback.humidity}%</div>
            <div class="wind">Wind: ${fallback.wind} km/h</div>
          </div>
          <div class="weather-note">
            <small>${getWeatherNote(
              location.name,
              fallback.description.includes("Clear") ? "Clear" : "Clouds"
            )}</small>
          </div>
        </div>
      `;
    }

    // Current Weather API response format
    const main = weatherData.main;
    const weather = weatherData.weather[0];
    const wind = weatherData.wind;

    return `
      <div class="weather-card">
        <div class="weather-header">
          <h3>${location.name}</h3>
          <div class="weather-icon">${getWeatherIcon(weather.icon)}</div>
        </div>
        <div class="weather-details">
          <div class="temperature">${Math.round(main.temp)}°C</div>
          <div class="condition">${weather.description}</div>
          <div class="humidity">Humidity: ${main.humidity}%</div>
          <div class="wind">Wind: ${Math.round(wind.speed * 3.6)} km/h</div>
        </div>
        <div class="weather-note">
          <small>${getWeatherNote(location.name, weather.main)}</small>
        </div>
      </div>
    `;
  }

  function getWeatherNote(location, condition) {
    const notes = {
      Lagos: {
        Clear: "Perfect for water tours and city exploration",
        Clouds: "Great weather for outdoor activities",
        Rain: "Indoor activities recommended",
        Thunderstorm: "Stay indoors, tours may be delayed",
      },
    };
    return (
      notes[location]?.[condition] || "Check local conditions for activities"
    );
  }

  function getCurrentDayName() {
    const today = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[today.getDay()];
  }

  function createForecastCard() {
    const today = getCurrentDayName();

    // Generate forecast data (simulated for demo)
    const forecastData = [
      { day: today, temp: 28, icon: "02d" },
      { day: "Wednesday", temp: 31, icon: "01d" },
      { day: "Friday", temp: 26, icon: "10d" },
    ];

    return `
      <div class="weather-card forecast-card">
        <div class="weather-header">
          <h3>3-Day Forecast</h3>
          <div class="weather-icon">📅</div>
        </div>
        <div class="forecast-container">
          ${forecastData
            .map(
              (day) => `
            <div class="forecast-item">
              <span class="forecast-day">${day.day}:</span>
              <span class="forecast-temp"><strong>${day.temp}°C</strong></span>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="weather-note">
          <small>Weather conditions for Lagos area</small>
        </div>
      </div>
    `;
  }

  async function loadWeatherData() {
    console.log("Loading weather data...");
    if (!weatherGrid) {
      console.error("Weather grid element not found!");
      return;
    }

    const weatherCards = [];

    // Load Lagos weather
    const lagosLocation = CHAMBER_LOCATIONS[0];
    console.log(`Fetching weather for ${lagosLocation.name}...`);
    const weatherData = await apiFetch(lagosLocation.lat, lagosLocation.lon);
    const lagosCard = createWeatherCard(lagosLocation, weatherData);
    weatherCards.push(lagosCard);

    // Add 3-day forecast
    const forecastCard = createForecastCard();
    weatherCards.push(forecastCard);

    weatherGrid.innerHTML = weatherCards.join("");
    console.log("Weather data loaded");
  }

  // Member Spotlights Functions
  async function fetchMembers() {
    console.log("Fetching members from:", MEMBERS_URL);
    try {
      const response = await fetch(MEMBERS_URL, { cache: "no-store" });
      console.log("Members API response status:", response.status);

      if (!response.ok) {
        throw new Error(`Members API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Members data received:", data);
      return data;
    } catch (error) {
      console.error("Error fetching members:", error);
      return [];
    }
  }

  function getMembershipBadge(level) {
    const badges = {
      3: { text: "Gold Member", class: "gold" },
      2: { text: "Silver Member", class: "silver" },
      1: { text: "Member", class: "member" },
    };
    return badges[level] || badges[1];
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function createSpotlightCard(member) {
    const badge = getMembershipBadge(Number(member.membership_level));

    return `
      <article class="spotlight-card ${badge.class}-member">
        <div class="spotlight-header">
          <img src="./images/${member.image}" alt="${
      member.name
    }" class="company-logo" 
               onerror="this.style.display='none'" />
          <div class="company-info">
            <h3>${member.name}</h3>
            <span class="member-badge ${badge.class}">${badge.text}</span>
          </div>
        </div>
        <div class="spotlight-content">
          <p>${
            member.description ||
            "A valued member of the TravelAll Chamber of Commerce."
          }</p>
          <div class="company-meta">
            <p><strong>Location:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone}">${
      member.phone
    }</a></p>
            <p><strong>Category:</strong> ${member.category}</p>
            ${
              member.business_hours
                ? `<p><strong>Hours:</strong> ${member.business_hours}</p>`
                : ""
            }
          </div>
          <a href="${
            member.website
          }" class="company-website" target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </div>
      </article>
    `;
  }

  async function loadMemberSpotlights() {
    console.log("Loading member spotlights...");
    if (!spotlightsGrid) {
      console.error("Spotlights grid element not found!");
      return;
    }

    try {
      const members = await fetchMembers();
      console.log("Total members fetched:", members.length);

      // Filter for Gold and Silver members only
      const eligibleMembers = members.filter(
        (member) => Number(member.membership_level) >= 2
      );
      console.log("Eligible members (Gold/Silver):", eligibleMembers.length);

      if (eligibleMembers.length === 0) {
        spotlightsGrid.innerHTML =
          "<p>No spotlight members available at this time.</p>";
        return;
      }

      // Randomly select 2-3 members
      const shuffledMembers = shuffleArray(eligibleMembers);
      const selectedMembers = shuffledMembers.slice(
        0,
        Math.min(3, eligibleMembers.length)
      );
      console.log("Selected members for spotlight:", selectedMembers.length);

      const spotlightCards = selectedMembers.map((member) =>
        createSpotlightCard(member)
      );
      spotlightsGrid.innerHTML = spotlightCards.join("");
      console.log("Member spotlights loaded");
    } catch (error) {
      console.error("Error loading member spotlights:", error);
      spotlightsGrid.innerHTML =
        "<p>Unable to load member spotlights at this time.</p>";
    }
  }

  // Initialize page functionality
  function init() {
    console.log("Initializing chamber home page...");

    // Check if elements exist
    console.log("Weather grid found:", !!weatherGrid);
    console.log("Spotlights grid found:", !!spotlightsGrid);
    console.log("Weather section found:", !!weatherSection);
    console.log("Spotlights section found:", !!spotlightsSection);

    // Add loading states
    if (weatherSection) {
      weatherSection.classList.add("loading");
    }

    if (spotlightsSection) {
      spotlightsSection.classList.add("loading");
    }

    // Load weather data
    loadWeatherData();

    // Load member spotlights
    loadMemberSpotlights();
  }

  // Start when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Export functions for potential external use
  window.ChamberHome = {
    loadWeatherData,
    loadMemberSpotlights,
    fetchMembers,
    apiFetch,
  };
})();
