import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

// Helper component to render multiline text with line breaks
function MultilineText({ text }) {
    const [user_id, setUser_id] = useState(-1);
    useEffect(() => {
    
      const _user_id = localStorage.getItem('user_id');
      if (_user_id) {
        setUser_id(parseInt(_user_id));
      }
      else {
        console.error("User ID not found in localStorage");
        window.location.href = '/';
      }
    }, [])
    
  return (
    <>
      {text.split('\n').map((line, idx) => (
        <React.Fragment key={idx}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
}

function ProblemDetails() {
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

  if (error) return <p>{error}</p>;
  if (!problem) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <Link to="/index">← Back to List</Link>
      <h2>{problem.title}</h2>

      <p>
        <strong>Statement:</strong>
        <br />
        <MultilineText text={problem.statement} />
      </p>

      <p>
        <strong>Input Format:</strong>
        <br />
        <MultilineText text={problem.input_format} />
      </p>

      <p>
        <strong>Output Format:</strong>
        <br />
        <MultilineText text={problem.output_format} />
      </p>

      <p>
        <strong>Constraints:</strong>
      </p>
      <ul>
        {problem.constraints &&
          Object.entries(problem.constraints).map(([key], idx) => (
            <li key={idx}>{key}</li>
          ))}
      </ul>

      <p>
        <strong>Time Limit:</strong> {problem.time_limit}
      </p>

      <p>
        <strong>Sample Testcases:</strong>
      </p>
      {problem.sample_testcases &&
        problem.sample_testcases.map((tc, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <pre>
              <strong>Input:</strong>
              <br />
              <MultilineText text={tc.input} />
            </pre>
            <pre>
              <strong>Output:</strong>
              <br />
              <MultilineText text={tc.output} />
            </pre>
          </div>
        ))}
    </div>
  );
}

export default ProblemDetails;
