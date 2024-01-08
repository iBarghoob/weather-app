# Weather App

## Description
This is a simple weather application that allows users to get current weather information for a specific city.

## Features
- Enter a city name to get the current weather details.
- Displays temperature, humidity, and weather description.
- Provides a corresponding emoji based on the weather condition.

## Technologies Used
- HTML
- CSS
- JavaScript

## Configuration
To use the app, you need to obtain an API key from OpenWeatherMap.
1. Sign up for an account on [OpenWeatherMap](https://openweathermap.org/).
2. Get your API key.
3. Create a file named `config.js` in the project root.
4. Add the following code to `config.js`:
   ```javascript
   const config = {
       apiKey: "YOUR_API_KEY"
   };
   export default config;
