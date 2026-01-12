import React from 'react';

function ForecastList({ forecast }) {
  // กรองข้อมูล: หยิบทุกๆ 8 รายการ (8 * 3ชม. = 24ชม. คือ 1 วันพอดี)
  // เพื่อให้ได้พยากรณ์ของวันถัดๆ ไป
  const dailyForecast = forecast.list.filter((reading, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="forecast-container">
      <h3>พยากรณ์ล่วงหน้า 5 วัน</h3>
      <div className="forecast-grid">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-item">
            {/* แปลงวันที่เป็นชื่อวันย่อ (จ., อ., พ.) */}
            <p>{new Date(day.dt * 1000).toLocaleDateString('th-TH', { weekday: 'short' })}</p>
            
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
              alt="icon" 
            />
            
            <p>{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;