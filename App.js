import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

  const fetchWeather = async () => {
    if (!city) return alert('Please enter a city name.');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setCity(''); // Clear input after fetching
    } catch (error) {
      alert('City not found. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const emojis = ['🌟', '☁️', '🌈', '🌞', '❄️', '🌸', '🎉', '💫', '🔥', '🌙', '🌻', '💨', '⭐', '✨', '🍀', '🍂', '🍃', '🍄', '🍉', '🍩', '🍒', '🍍', '🥥', '🥑', '🥭', '🥝', '🍇', '🍓', '🍊', '🍋', '🍎', '🍏', '🍉', '🍌', '🍍', '🥭', '🥑', '🍔', '🍟', '🍕', '🍖', '🍗', '🥩', '🍗', '🍣', '🍱', '🍲', '🍖', '🍛', '🍚'];  // More emojis added

  const generateRandomPosition = () => {
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 10}s`,  // Random duration between 10s and 15s
    };
  };

  return (
    <div className="App">
      {/* Floating Emojis */}
      {Array(50).fill().map((_, index) => {
        const emoji = emojis[index % emojis.length]; // Loop through emojis if we exceed the list
        const position = generateRandomPosition();
        return (
          <div 
            key={index} 
            className="emoji" 
            style={{ 
              ...position, 
              animationDuration: position.animationDuration 
            }}
          >
            {emoji}
          </div>
        );
      })}

      {/* Main Weather Container */}
      <div className="container">
        <h1 className="fade-in">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress} // Fetch weather on pressing Enter
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {weather && (
          <div className="weather-info slide-up">
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
