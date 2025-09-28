// Configuration file for Chamber Home Page
// Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key

window.ChamberConfig = {
  // Get your free API key from: https://openweathermap.org/api
  WEATHER_API_KEY: "ff20cd3c9edcd5423d77d6d600dc9939",

  // Chamber locations for weather data
  CHAMBER_LOCATIONS: [
    { name: "Lagos", lat: 6.5244, lon: 3.3792, country: "NG" },
    // {
    //   name: "Kaduna",
    //   lat: 10.503386199375527,
    //   lon: 7.434603636941506,
    //   country: "NG",
    // },
  ],

  // Members data URL
  MEMBERS_URL: "./data/members.json",
};
