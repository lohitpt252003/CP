import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProblemList from './components/ProblemList';
import ProblemDetails from './components/ProblemDetails';
import SubmitCode from './components/SubmitCode';  // You'll create this later
import Submissions from './components/Submissions';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<LandingPage />} />
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/problem/:id" element={<ProblemDetails />} />
        <Route path="/submit" element={<SubmitCode />} />
        <Route path="/submissions" element={<Submissions />} />

      </Routes>
    </Router>
  );
}

export default App;
