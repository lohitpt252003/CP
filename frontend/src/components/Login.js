import React, { useNavigate, useState } from "react";
import { redirect } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const url = process.env.REACT_APP_BACKEND_IP || "https://localhost:5000";
      // console.log(url);
      console.log("Backend URL:", process.env.REACT_APP_BACKEND_IP);
      
      const res = await fetch(`${url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setMessage("Login successful!");
        // onLogin(data);
        localStorage.setItem('user', username);
        localStorage.setItem('user_id', data.user_id);
        window.location.href = '/index'
      } else {
        setMessage(data.error || "Login failed.");
      }
    } catch (err) {
      setMessage(`Server error.: ${err}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      /><br /><br />
      <button onClick={handleLogin} style={{ padding: "8px 16px" }}>
        Login
      </button>
      <p>{message}</p>
    </div>
  );
}

export default Login;
