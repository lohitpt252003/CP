import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  const [user_id, setUser_id] = useState(-1)
  const [user, setUser] = useState(-1)
  useEffect(() => {
    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');
    if (!user) {
      window.location.href = '/';
      return;
    }
    
    setUser(user);
    setUser_id(user_id)
    console.log(user);
  }, []);

  return (
    <div style={styles.container}>
      <h1>Welcome {user} to Coding Arena 101</h1>
      <p>Select an option below to get started:</p>

      <nav style={styles.nav}>
        <Link to="/problems" style={styles.link}>
          View Problems
        </Link>
        <Link to="/submit" style={styles.link}>
          Submit Code
        </Link>
        <Link to={`/submissions`} style={styles.link}>
          My Submissions
        </Link>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  nav: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
  link: {
    padding: '15px 25px',
    fontSize: '18px',
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#007bff',
    borderRadius: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  },
};

export default LandingPage;
