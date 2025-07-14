import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import Profile from "./pages/Profile";
import LearningPath from "./pages/LearningPath";
import Admin from "./pages/Admin";
import Stats from "./pages/Stats";
import CodingPractice from "./pages/CodingPractice";
import Leaderboard from "./pages/Leaderboard"; //
const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-purple-950 to-black text-white">
        <Routes>
          {!token ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume-upload" element={<ResumeUpload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/learning-path" element={<LearningPath />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/coding-practice" element={<CodingPractice />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
