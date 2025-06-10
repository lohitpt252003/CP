import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

function SubmitCode() {
  const [problemId, setProblemId] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [problems, setProblems] = useState([]);
  const [user_id, setUser_id] = useState(-1);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      setUser_id(parseInt(user_id));
    }
    else {
      console.error("User ID not found in localStorage");
      window.location.href = '/';
    }
    const url = process.env.REACT_APP_BACKEND_IP || "https://localhost:5000";
    axios.get(`${url}/problems`)
      .then(res => setProblems(res.data))
      .catch(err => console.error("Failed to fetch problems", err));
  }, []);

  const handleSubmit = async () => {
    // const user_id = localStorage.getItem('user_id');
    setResponse("Solution submitted, please wait for the result...");
    try {
      const url = process.env.REACT_APP_BACKEND_IP || "https://localhost:5000";
      const res = await axios.post(`${url}/submit`, {
        problem_id: problemId,
        lang : language,
        code : code,
        user_id: user_id
      });
      console.log(typeof(res));
      console.log(res);
      let str = '';
      str += res.data.message + '\n';
      str += res.data.status + '\n';
      str += res.data.msg + '\n';
      setResponse(str || 'Submitted successfully!');
      // setLogs(res.data.logs || []);
      setLogs(res.data.logs || []); // ✅ correct key name

      console.log(res.data.logs);
    }
    catch (err) {
      setResponse('Error submitting code: ' + err.message);
    }
  };

  const handleProblemSelect = (id) => {
    setProblemId(id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <Link to="/index">← Back to Home</Link>
      <h2>Submit Code</h2>

      <div>
        <strong>Available Problems:</strong>
        <ul>
          {problems.map((prob) => (
            <li key={prob.id}>
              <span style={{ marginRight: '10px' }}><strong>{prob.id}</strong>: {prob.title}</span>
              <button onClick={() => handleProblemSelect(prob.id)} style={{ marginLeft: '10px' }}>
                Use this
              </button>
            </li>
          ))}
        </ul>
      </div>

      <hr style={{ margin: '30px 0' }} />

      <label>Problem ID:</label>
      <input
        type="text"
        value={problemId}
        onChange={(e) => setProblemId(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '200px' }}
      />

      <label>Language:</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>

      <label>Code:</label>
      <br />
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="20"
        cols="80"
        placeholder="Write your code here..."
        style={{
          fontFamily: 'monospace',
          fontSize: '14px',
          padding: '10px',
          width: '100%',
          maxWidth: '900px',
          boxSizing: 'border-box',
        }}
      ></textarea>

      <br />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          fontSize: '16px',
        }}
      >
        Submit
      </button>

      {response && (
        <p style={{ marginTop: '20px', color: 'green', fontWeight: 'bold' }}>
          {response}
        </p>

      )}

      {logs.length > 0 && (
        <div>
          <h3>Testcase Results</h3>
          <ul>
            {logs.map((log, idx) => (
              <li key={idx}>
                <strong>Testcase {log.testcase}</strong><br />
                <em>Input:</em> <pre>{log.input}</pre>
                <em>Expected:</em> <pre>{log.expected}</pre>
                <em>Output:</em> <pre>{log.output}</pre>
                {/* <em>Status:</em> {log.status ? "PASS" : "FAIL"} */}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default SubmitCode;
