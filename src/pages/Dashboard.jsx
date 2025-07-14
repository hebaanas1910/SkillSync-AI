import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaRocket, FaPen } from "react-icons/fa"; // Icons for Profile, Career, Resume Feedback

const Dashboard = () => {
  const [resume, setResume] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [preview, setPreview] = useState("");
  const [score, setScore] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [careerGoal, setCareerGoal] = useState("Software Engineer");

  // Handle file upload and processing logic...
  const handleResumeUpload = async (e) => {
    // File handling logic here...
  };

  // Fetch jobs from the backend...
  const fetchJobs = async () => {
    // Fetch jobs from the backend...
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-10 bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white">
      <motion.div
        className="max-w-6xl mx-auto p-10 rounded-3xl border border-purple-700 bg-white/5 backdrop-blur-lg shadow-2xl transition-transform duration-500 transform hover:scale-105"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-purple-300 mb-10 text-center tracking-wide">
          🚀 SkillSync AI Dashboard
        </h1>

        {/* User Profile Section */}
        <div className="flex items-center gap-4 mb-8">
          <FaUserCircle size={40} className="text-purple-400" />
          <div>
            <h2 className="text-2xl font-bold text-purple-200">John Doe</h2>
            <p className="text-purple-300">johndoe@example.com</p>
          </div>
        </div>

        {/* Career Goal Section */}
        <div className="mb-8">
          <label className="block text-lg text-purple-200 mb-2 font-medium">
            🚀 Choose Your Career Goal
          </label>
          <select
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            className="w-full p-3 rounded-lg bg-purple-900 border border-purple-500 text-white"
          >
            <option value="Software Engineer">Software Engineer</option>
            <option value="AI Engineer">AI Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
          </select>
        </div>

        {/* Resume Upload */}
        <div className="mb-8">
          <label className="block text-lg text-purple-200 mb-2 font-medium">
            📄 Upload Your Resume
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            className="w-full p-3 rounded-lg bg-purple-900 border border-purple-500 text-white hover:bg-purple-700 transition-all duration-300"
          />
        </div>

        {loading && <p className="text-purple-300 mt-4">⏳ Analyzing resume...</p>}

        {/* Resume Score */}
        {score !== null && (
          <div className="my-6">
            <h3 className="text-lg font-semibold text-purple-200 mb-2">📊 Resume Score</h3>
            <div className="w-full bg-gray-800 rounded-full h-6 shadow-inner">
              <motion.div
                className={`h-6 rounded-full text-right pr-3 font-bold flex items-center justify-end text-sm ${score >= 70 ? "bg-green-500" : score >= 40 ? "bg-yellow-400 text-black" : "bg-red-500"}`}
                style={{ width: `${score}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.8 }}
              >
                {score}%
              </motion.div>
            </div>
          </div>
        )}

        {/* Skills Extracted from Resume */}
        {keywords.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-purple-300 mb-2">🧠 Extracted Skills</h2>
            <div className="flex flex-wrap gap-3">
              {keywords.map((skill, i) => (
                <motion.span
                  key={i}
                  className="px-4 py-1 rounded-full bg-purple-700/60 border border-purple-400 text-sm shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Resume Preview */}
        {preview && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-purple-300 mb-2">📄 Resume Preview</h2>
            <pre className="bg-gray-900 p-5 rounded-xl text-sm max-h-64 overflow-y-auto whitespace-pre-wrap border border-purple-600 shadow-inner">
              {preview}
            </pre>
          </div>
        )}

        {/* Job Recommendations */}
        {jobs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-purple-300 mb-4">💼 Recommended Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job, i) => (
                <motion.div
                  key={i}
                  className="bg-purple-900/60 border border-purple-600 p-5 rounded-xl shadow-lg transition hover:shadow-2xl hover:scale-[1.02]"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-bold text-purple-100">{job.title}</h3>
                  <p className="text-sm mt-2 text-purple-200">
                    <strong>Required:</strong> {job.skillsRequired.join(", ")}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {jobs.length === 0 && score !== null && !loading && (
          <p className="text-center text-purple-400 mt-6">
            😔 No job matches found. Try uploading a better resume or adding more skills.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
