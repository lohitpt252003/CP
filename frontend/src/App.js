import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProblemList from './components/ProblemList';
import ProblemDetails from './components/ProblemDetails';
import SubmitCode from './components/SubmitCode';  // You'll create this later
import Submissions from './components/Submissions';
import Login from './components/Login';
import Logout from './components/Logout';  // You'll create this later
import Contests from './components/Contests';   // './components/Contests';
import ContestDetails from './components/ContestDetails';
// import Header from './components/Header';


function App() {
  return (
    <Router>
      {/* ✅ Common Header */}
      {/* <Header /> */}
      <Routes>
        {/* ✅ Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* ✅ Main Pages */}
        <Route path="/index" element={<LandingPage />} />
        
        {/* ✅ Problems */}
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/problem/:id" element={<ProblemDetails />} />
        
        {/* ✅ Submissions */}
        <Route path="/submit" element={<SubmitCode />} />
        <Route path="/submissions" element={<Submissions />} />

        {/* ✅ Contest Pages */}
        <Route path="/contests" element={<Contests />} />
        <Route path="/contest/:id" element={<ContestDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
