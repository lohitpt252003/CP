import React, { useEffect, useState } from 'react';
import Header from './Header';
import './LandingPage.css';

function LandingPage() {
  const [user_id, setUser_id] = useState(-1);
  const [user, setUser] = useState('');

  useEffect(() => {
    const _user = localStorage.getItem('user');
    const _user_id = localStorage.getItem('user_id');
    if (!_user) {
      window.location.href = '/';
      return;
    }

    setUser(_user);
    setUser_id(_user_id);
  }, []);

  return (
    <div className="LandingPage-container">
      <Header />
      <h1 className="LandingPage-welcome">Welcome {user} to Coding Arena 101</h1>
    </div>
  );
}

export default LandingPage;
