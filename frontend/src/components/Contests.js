// Contests.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './Contests.css';

export default function Contests() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_IP || "https://localhost:5000";
    axios.get(`${url}/contests`)
      .then(res => setContests(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="Contests-Container">
      <Header />
      <h2 className="Contests-Title">Available Contests</h2>
      <ul className="Contests-List">
        {contests.map(c => (
          <li key={c.id} className="Contests-Item">
            <Link to={`/contest/${c.id}`} className="Contests-Link">
              {c.title}
            </Link>
            <span className="Contests-Time">
              {new Date(c.start_time).toLocaleString()} → {new Date(c.end_time).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
