import React from 'react';

function SearchBar({ city, setCity, fetchWeather, fetchWeatherByLocation }) {
  return (
    <div className="search-box">
      <input 
        type="text" 
        placeholder="ชื่อเมือง (ไทย/Eng)..." 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
      />
      <button onClick={fetchWeather}>🔍</button>
      <button onClick={fetchWeatherByLocation} className="gps-btn">📍</button>
    </div>
  );
}

export default SearchBar;