import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// import Header
import Header from './Header';

function ContestDetails() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_IP || "https://localhost:5000";
    axios.get(`${url}/contest/${id}`)
      .then(res => setContest(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!contest) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <h2>{contest.title}</h2>
      <p>{contest.description}</p>
      <h3>Problems:</h3>
      <ul>
        {contest.problems.map(pid => (
          <li key={pid}><Link to={`/problem/${pid}`}>Problem {pid}</Link></li>
        ))}
      </ul>
      <p><strong>Start:</strong> {contest.start_time}</p>
      <p><strong>End:</strong> {contest.end_time}</p>
    </div>
  );
}

export default ContestDetails;
