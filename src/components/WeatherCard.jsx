import React from 'react';

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
        alt={weather.weather[0].description} 
        className="weather-icon"
      />

      <div className="temp">
        {Math.round(weather.main.temp)}°C
      </div>
      <p className="description">{weather.weather[0].description}</p>
      
      <div className="details">
        <div className="detail-item">
          <span>💧 ความชื้น</span>
          <span>{weather.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span>💨 ลมแรง</span>
          <span>{weather.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;