// ContestDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './ContestDetails.css';

export default function ContestDetails() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_IP || "https://localhost:5000";
    axios.get(`${url}/contest/${id}`)
      .then(res => setContest(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!contest) return <p className="ContestDetails-Loading">Loading...</p>;

  return (
    <div className="ContestDetails-Container">
      <Header />
      <h2 className="ContestDetails-Title">{contest.title}</h2>
      <p className="ContestDetails-Description">{contest.description}</p>

      <h3 className="ContestDetails-Subheading">Problems:</h3>
      <ul className="ContestDetails-List">
        {contest.problems.map(pid => (
          <li key={pid} className="ContestDetails-Item">
            <Link to={`/problem/${pid}`} className="ContestDetails-Link">
              Problem {pid}
            </Link>
          </li>
        ))}
      </ul>

      <div className="ContestDetails-Times">
        <p>
          <strong className="ContestDetails-Label">Start:</strong>{" "}
          {new Date(contest.start_time).toLocaleString()}
        </p>
        <p>
          <strong className="ContestDetails-Label">End:</strong>{" "}
          {new Date(contest.end_time).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
