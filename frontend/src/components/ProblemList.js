import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProblemList() {
  const [user_id, setUser_id] = useState(-1);
      const _user_id = localStorage.getItem('user_id');
      if (_user_id) {
        setUser_id(parseInt(_user_id));
      }
      else {
        console.error("User ID not found in localStorage");
        window.location.href = '/';
      }
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/problems')
      .then(res => setProblems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Problems</h2>
      <ul>
        {problems.map(p => (
          <li key={p.id}>
            <Link to={`/problem/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemList;
