import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [user, setuser] = useState('');
  const [user_id, setUser_id] = useState(-1);
  useEffect(() => {
    const _user = localStorage.getItem('user');
    const _user_id = localStorage.getItem('user_id');

    if (!_user) {
      window.location.href = '/';
      return;
    }

    setuser(_user);
    setUser_id(_user_id);
    console.log("User ID:", _user_id);
    const url = process.env.REACT_APP_BACKEND_IP || "https://localhost:5000";
    axios.get(`${url}/submissions/${_user_id}`)
      .then(res => setSubmissions(res.data))
      .catch(err => console.error("Failed to fetch submissions", err));
  }, []);
  console.log(submissions);


  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <Link to="/index">← Back to Home</Link>
      <h2>All Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Problem ID</th>
              <th>Verdict</th>
              <th>Language</th>
              <th>Code (Preview)</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, index) => (
              <tr key={index}>
                <td>{sub.submission_id}</td>
                <td>{sub.problem_id}</td>
                <td>{sub.status}</td>
                <td>{sub.language}</td>
                <td>
                  <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '150px', overflowY: 'auto' }}>
                    {sub.code}
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Submissions;
