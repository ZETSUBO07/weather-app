import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // ดึง CSS มาใช้เพื่อให้รู้จักพื้นหลัง

function About() {
  return (
    // 1. ใส่ class เพื่อเรียกพื้นหลังสีฟ้า (app-default)
    <div className="app-container app-default">
      
      {/* 2. ใส่ container เพื่อให้มีกล่องกระจกสวยๆ */}
      <div className="container">
        <h1>เกี่ยวกับเรา ☁️</h1>
        
        <div style={{ margin: '30px 0', lineHeight: '1.8' }}>
          <p>แอพพยากรณ์อากาศ 🌤️</p>
          <p>เครื่องมือ: React.js + Vite</p>
          <p>API: OpenWeatherMap</p>
        </div>

        {/* ปุ่มย้อนกลับ */}
        <Link to="/">
          <button 
            style={{ 
              width: 'auto',       /* แก้ให้ปุ่มยืดหดตามตัวหนังสือ ไม่โดนบีบ */
              height: 'auto',      /* แก้ความสูงให้พอดี */
              padding: '12px 25px', 
              borderRadius: '30px',
              fontSize: '1rem',
              background: 'white',
              color: '#333'
            }}
          >
            🏠 กลับหน้าหลัก
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;