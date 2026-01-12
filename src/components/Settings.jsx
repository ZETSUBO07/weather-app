import React from 'react';

function Settings({ unit, setUnit }) {
  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h2>การตั้งค่า ⚙️</h2>
      
      <div className="setting-item">
        <p>หน่วยอุณหภูมิ</p>
        <div className="unit-toggle">
          <button 
            className={unit === 'metric' ? 'active-unit' : ''} 
            onClick={() => setUnit('metric')}
          >
            °C (เซลเซียส)
          </button>
          <button 
            className={unit === 'imperial' ? 'active-unit' : ''} 
            onClick={() => setUnit('imperial')}
          >
            °F (ฟาเรนไฮต์)
          </button>
        </div>
      </div>
      
      <p style={{ marginTop: '50px', opacity: 0.6 }}>Version 1.0.0</p>
    </div>
  );
}

export default Settings;