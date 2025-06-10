// ProblemDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './ProblemDetails.css';

// Helper component to render multiline text with line breaks
function MultilineText({ text }) {
  const [user_id, setUser_id] = useState(-1);

  useEffect(() => {
    const _user_id = localStorage.getItem('user_id');
    if (_user_id) {
      setUser_id(parseInt(_user_id, 10));
    } else {
      console.error("User ID not found in localStorage");
      window.location.href = '/';
    }
  }, []);

  return (
    <>
      {text.split('\n').map((line, idx) => (
        <span key={idx} className="MultilineText-Line">
          {line}
          <br />
        </span>
      ))}
    </>
  );
}

export default function ProblemDetails() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_IP || "https://localhost:5000";
    axios
      .get(`${url}/problem/${id}`)
      .then((res) => {
        setProblem(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load problem.');
        setProblem(null);
      });
  }, [id]);

  if (error) return <p className="ProblemDetails-Error">{error}</p>;
  if (!problem) return <p className="ProblemDetails-Loading">Loading...</p>;

  return (
    <div className="ProblemDetails-Container">
      <Header />
      <Link to="/index" className="ProblemDetails-Link">← Back to List</Link>
      <h2 className="ProblemDetails-Title">{problem.title}</h2>

      <div className="ProblemDetails-Section">
        <p>
          <strong className="ProblemDetails-Label">Statement:</strong><br />
          <MultilineText text={problem.statement} />
        </p>
      </div>

      <div className="ProblemDetails-Section">
        <p>
          <strong className="ProblemDetails-Label">Input Format:</strong><br />
          <MultilineText text={problem.input_format} />
        </p>
      </div>

      <div className="ProblemDetails-Section">
        <p>
          <strong className="ProblemDetails-Label">Output Format:</strong><br />
          <MultilineText text={problem.output_format} />
        </p>
      </div>

      <div className="ProblemDetails-Section">
        <p><strong className="ProblemDetails-Label">Constraints:</strong></p>
        <ul className="ProblemDetails-List">
          {problem.constraints &&
            Object.entries(problem.constraints).map(([key], idx) => (
              <li key={idx} className="ProblemDetails-ListItem">{key}</li>
          ))}
        </ul>
      </div>

      <div className="ProblemDetails-Section">
        <p>
          <strong className="ProblemDetails-Label">Time Limit:</strong> {problem.time_limit}
        </p>
      </div>

      <div className="ProblemDetails-Section">
        <p><strong className="ProblemDetails-Label">Sample Testcases:</strong></p>
        {problem.sample_testcases.map((tc, i) => (
          <div key={i} className="ProblemDetails-Testcase">
            <pre className="ProblemDetails-Pre">
              <strong className="ProblemDetails-Label">Input:</strong><br />
              <MultilineText text={tc.input} />
            </pre>
            <pre className="ProblemDetails-Pre">
              <strong className="ProblemDetails-Label">Output:</strong><br />
              <MultilineText text={tc.output} />
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
