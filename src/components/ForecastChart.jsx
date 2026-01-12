import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ForecastChart({ forecast }) {
  // ดึงข้อมูล 8 ช่วงเวลาแรก (24 ชม.) มาแสดง
  const data = forecast.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    temp: Math.round(item.main.temp)
  }));

  return (
    <div style={{ marginTop: '20px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '15px' }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '1rem' }}>แนวโน้มอุณหภูมิ (24 ชม.) 📈</h3>
      
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffeb3b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffeb3b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="white" fontSize={12} tickLine={false} />
            <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '10px' }}
              itemStyle={{ color: '#ffeb3b' }}
            />
            <Area type="monotone" dataKey="temp" stroke="#ffeb3b" fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ForecastChart;