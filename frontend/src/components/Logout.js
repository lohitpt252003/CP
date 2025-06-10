import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear user session
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');

    // ⏳ Wait 1 second, then redirect
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="Logout-container">
      <h2>You have been logged out.</h2>
      <p>Redirecting to login...</p>
    </div>
  );
}

export default Logout;
