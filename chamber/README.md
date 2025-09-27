# Chamber Home Page - Setup Instructions

## Weather API Setup

To enable real weather data, you need to:

1. **Get a free OpenWeatherMap API key:**

   - Visit: https://openweathermap.org/api
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Configure the API key:**
   - Open `chamber/scripts/config.js`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key:
   ```javascript
   WEATHER_API_KEY: 'your_actual_api_key_here',
   ```

## Features Implemented

### 🌤️ Weather Section

- **Real-time weather data** for Lagos and Kaduna
- **Current conditions**: Temperature, description, humidity, wind speed
- **3-day forecast**: High/low temperatures with weather icons
- **Location-specific notes**: Activity recommendations based on weather

### 🏢 Dynamic Member Spotlights

- **Random selection**: 2-3 members displayed each page load
- **Gold/Silver members only**: Filters for premium members
- **Complete information**: Name, logo, phone, address, website, membership level
- **Responsive design**: Works on all screen sizes

### 📱 Mobile-First Design

- **767px and below**: Mobile view
- **768px and above**: Desktop view
- **Touch-friendly**: Optimized for mobile interaction

## File Structure

```
chamber/
├── index.html              # Main home page
├── scripts/
│   ├── config.js           # Configuration (API keys)
│   ├── home.js            # Home page functionality
│   └── directory.js       # Directory functionality
├── styles/
│   ├── home.css           # Home page styles
│   └── directory.css      # Directory styles
└── data/
    └── members.json       # Member data
```

## API Requirements

- **OpenWeatherMap One Call API**: For weather data
- **Free tier**: 1,000 calls/day (sufficient for development)
- **No authentication**: Uses API key in URL

## Browser Support

- Modern browsers with ES6+ support
- Fetch API support required
- No Internet Explorer support

## Troubleshooting

### Weather not loading?

1. Check your API key in `config.js`
2. Verify API key is active on OpenWeatherMap
3. Check browser console for errors
4. Ensure internet connection

### Members not loading?

1. Check `members.json` file exists
2. Verify JSON format is valid
3. Check browser console for errors

### Styling issues?

1. Ensure all CSS files are linked
2. Check for CSS conflicts
3. Verify responsive breakpoints
