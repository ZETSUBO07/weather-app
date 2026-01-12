import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Components
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import ForecastChart from './components/ForecastChart'; // กราฟที่คุณเคยทำ
import Settings from './components/Settings';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  
  // State สำหรับหน่วย (metric = C, imperial = F)
  const [unit, setUnit] = useState("metric");

  // ⚠️⚠️ ใส่ API Key ตรงนี้เหมือนเดิมนะครับ ⚠️⚠️
  const API_KEY = "288fd46392cc441a7253ff4e91d73b4c";

  // ฟังก์ชันดึงข้อมูล (อัปเดตให้รองรับการเปลี่ยนหน่วย)
  const fetchAllData = async (lat, lon, cityName) => {
    try {
      // ถ้าไม่มี city และไม่มี lat/lon ให้จบการทำงาน
      if (!cityName && !lat) return;

      let weatherUrl, forecastUrl;
      const query = cityName ? `q=${cityName}` : `lat=${lat}&lon=${lon}`;
      
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${API_KEY}&units=${unit}&lang=th`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${API_KEY}&units=${unit}&lang=th`;

      const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      if (weatherRes.ok && forecastRes.ok) {
        setWeather(weatherData);
        setForecast(forecastData);
        setError("");
      } else {
        setError("ไม่พบข้อมูล");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

  // ดึงข้อมูลใหม่ทุกครั้งที่เปลี่ยนหน่วย (unit)
  useEffect(() => {
    if (weather) { // ถ้ามีข้อมูลเดิมอยู่แล้ว ให้ดึงใหม่ด้วยหน่วยใหม่
       fetchAllData(null, null, weather.name);
    }
  }, [unit]);

  const handleSearch = () => { if (city) fetchAllData(null, null, city); };
  
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchAllData(position.coords.latitude, position.coords.longitude);
        setCity("");
      });
    }
  };

  const getBackgroundClass = () => {
    if (!weather) return "app-default";
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("rain")) return "app-rain";
    if (condition.includes("clear")) return "app-clear";
    if (condition.includes("clouds")) return "app-clouds";
    return "app-default";
  };

  return (
    <BrowserRouter>
      <div className={`app-container ${getBackgroundClass()}`}>
        
        {/* ส่วนค้นหา (แสดงทุกหน้า ยกเว้นหน้า Setting) */}
        <div className="top-section">
           <SearchBar 
             city={city} setCity={setCity} 
             fetchWeather={handleSearch} fetchWeatherByLocation={handleLocation} 
           />
           {error && <p className="error-msg">{error}</p>}
        </div>

        {/* ส่วนเนื้อหาที่จะเปลี่ยนไปตาม Router */}
        <div className="content-area">
          <Routes>
            {/* หน้า 1: Now */}
            <Route path="/" element={
              weather ? <WeatherCard weather={weather} unit={unit} /> : <div className="welcome-text">กรุณาค้นหาชื่อเมือง...</div>
            } />

            {/* หน้า 2: Hourly (ใช้กราฟ) */}
            <Route path="/hourly" element={
              forecast ? <ForecastChart forecast={forecast} /> : <p>กรุณาค้นหาเมืองก่อนครับ</p>
            } />

            {/* หน้า 3: Daily (รายการ 5 วัน) */}
            <Route path="/daily" element={
              forecast ? <ForecastList forecast={forecast} /> : <p>กรุณาค้นหาเมืองก่อนครับ</p>
            } />

            {/* หน้า 4: Settings */}
            <Route path="/settings" element={
              <Settings unit={unit} setUnit={setUnit} />
            } />
          </Routes>
        </div>

        {/* เมนูด้านล่าง */}
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;