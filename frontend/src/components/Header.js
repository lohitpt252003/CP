// import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <nav className="Header-container">
      <div className="Header-logo">⚡ Coding Arena</div>
      <ul className="Header-links">
        <li><Link to="/index">🏠 Home</Link></li>
        <li><Link to="/problems">🧩 Problems</Link></li>
        <li><Link to="/submit">📤 Submit</Link></li>
        <li><Link to="/contests">🏆 Contests</Link></li>
        <li><Link to="/submissions">📜 Submissions</Link></li>
        <li><Link to="/logout">🔐 Logout</Link></li>
      </ul>
    </nav>
  );
}

export default Header;
