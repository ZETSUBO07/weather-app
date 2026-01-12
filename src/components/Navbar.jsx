import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css'; // เราจะไปเพิ่ม CSS ทีหลัง

function Navbar() {
  const location = useLocation();
  
  // ฟังก์ชันเช็คว่าอยู่หน้าไหน ให้ปุ่มนั้นเด่นขึ้น
  const isActive = (path) => location.pathname === path ? "nav-item active" : "nav-item";

  return (
    <nav className="bottom-nav">
      <Link to="/" className={isActive("/")}>
        <span>🌤️</span>
        <small>Now</small>
      </Link>
      
      <Link to="/hourly" className={isActive("/hourly")}>
        <span>📈</span>
        <small>Hour</small>
      </Link>
      
      <Link to="/daily" className={isActive("/daily")}>
        <span>📅</span>
        <small>Daily</small>
      </Link>
      
      <Link to="/settings" className={isActive("/settings")}>
        <span>⚙️</span>
        <small>Setting</small>
      </Link>
    </nav>
  );
}

export default Navbar;