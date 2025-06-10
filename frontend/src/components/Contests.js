import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function Contests() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_IP || "https://localhost:5000";
    axios.get(`${url}/contests`)
      .then(res => setContests(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Header />
      <h2>Available Contests</h2>
      <ul>
        {contests.map(c => (
          <li key={c.id}>
            <Link to={`/contest/${c.id}`}>{c.title}</Link> ({c.start_time} → {c.end_time})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contests;
