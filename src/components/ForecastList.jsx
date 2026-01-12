import React from 'react';

function ForecastList({ forecast }) {
  // 👇 ส่วนที่หายไปคือบรรทัดนี้ครับ (มันคือตัวดึงข้อมูล 8 ช่วงเวลา)
  const next24Hours = forecast.list.slice(0, 8); 

  return (
    <div className="forecast-list-container" style={{ marginTop: '30px' }}>
      <h3 style={{ marginLeft: '10px', marginBottom: '15px' }}>พยากรณ์ล่วงหน้า (3 ชั่วโมง) 🕒</h3>
      
      <div className="forecast-list">
        {next24Hours.map((item, index) => (
          <div key={index} className="forecast-item">
            
            {/* 1. เวลา */}
            <span className="forecast-time">
              {new Date(item.dt * 1000).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
            </span>
            
            {/* 2. ไอคอน (ใส่กล่อง div หุ้มเพื่อจัดระเบียบ) */}
            <div className="forecast-icon-container">
              <img 
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
                alt={item.weather[0].description} 
              />
            </div>
            
            {/* 3. อุณหภูมิ */}
            <span className="forecast-temp">
              {Math.round(item.main.temp)}°
            </span>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;