import React from 'react';

function WeatherCard({ weather, unit }) { // 1. รับ prop 'unit' เข้ามา
  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      
      <div className="weather-icon">
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
          alt={weather.weather[0].description} 
        />
      </div>

      {/* 2. เช็คเงื่อนไข: ถ้าเป็น metric ให้โชว์ °C ถ้าไม่ใช่ (imperial) ให้โชว์ °F */}
      <h1 className="temp">
        {Math.round(weather.main.temp)}
        {unit === 'metric' ? '°C' : '°F'}
      </h1>

      <p className="description">{weather.weather[0].description}</p>

      <div className="details">
        <div className="detail-item">
          <span>💧 ความชื้น</span>
          <span>{weather.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span>💨 ลมแรง</span>
          {/* ปรับหน่วยความเร็วลมด้วยก็ได้ (m/s หรือ mph) */}
          <span>{weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;