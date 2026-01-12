import { useState } from 'react';
import { Link } from 'react-router-dom'; // นำเข้า Link เพื่อกดไปหน้า About
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import ForecastList from './ForecastList';

function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  // ⚠️⚠️ อย่าลืมใส่ API Key ของคุณตรงนี้นะครับ (เหมือนเดิม) ⚠️⚠️
  const API_KEY = "288fd46392cc441a7253ff4e91d73b4c"; 

  const fetchAllData = async (lat, lon, cityName) => {
    try {
      let weatherUrl, forecastUrl;
      if (cityName) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=th`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=th`;
      } else {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=th`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=th`;
      }

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
        setError("ไม่พบข้อมูล หรือ API Key ผิดพลาด");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

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
    <div className={`app-container ${getBackgroundClass()}`}>
       {/* ปุ่มลิงก์ไปหน้า About (มุมขวาบน) */}
       <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none', background: 'rgba(0,0,0,0.3)', padding: '8px 15px', borderRadius: '20px', backdropFilter: 'blur(5px)' }}>
            เกี่ยวกับเรา ℹ️
          </Link>
       </div>

      <div className="container">
        <h1>พยากรณ์อากาศ 🌤️</h1>
        <SearchBar city={city} setCity={setCity} fetchWeather={handleSearch} fetchWeatherByLocation={handleLocation} />
        {error && <p className="error-msg">{error}</p>}
        {weather && <WeatherCard weather={weather} />}
        {forecast && <ForecastList forecast={forecast} />}
      </div>
    </div>
  );
}

export default Home;