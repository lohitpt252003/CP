import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './ProblemList.css';

function ProblemList() {
  const [user_id, setUser_id] = useState(-1);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const _user_id = localStorage.getItem('user_id');
    if (_user_id) {
      setUser_id(parseInt(_user_id));
    } else {
      console.error("User ID not found in localStorage");
      window.location.href = '/';
    }

    const url = process.env.REACT_APP_BACKEND_IP || "http://localhost:5000";
    axios.get(`${url}/problems`)
      .then(res => setProblems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ProblemList-container">
      <Header />
      <h2 className="ProblemList-title">🧩 All Problems</h2>
      <ul className="ProblemList-list">
        {problems.map(p => (
          <li key={p.id} className="ProblemList-item">
            <Link to={`/problem/${p.id}`} className="ProblemList-link">{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemList;
