import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; 

// นำเข้าหน้า Home และ About ที่เราเพิ่งสร้าง
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* เส้นทางที่ 1: หน้าแรก (/) ให้โชว์ Home */}
        <Route path="/" element={<Home />} />
        
        {/* เส้นทางที่ 2: หน้าเกี่ยวกับ (/about) ให้โชว์ About */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;