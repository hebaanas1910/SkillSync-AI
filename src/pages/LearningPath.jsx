import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const LearningPath = () => {
  const allCareerGoals = [
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Data Scientist",
    "Software Engineer",
    "DevOps Engineer",
    "Cloud Architect",
    "UI/UX Designer",
    "Cybersecurity Specialist",
    "Blockchain Developer",
    "AI Researcher",
    "Game Developer",
    "IoT Developer",
    "Mobile App Developer",
    "Data Engineer",
    "Software Architect",
    "Network Engineer",
  ];

  const [careerGoal, setCareerGoal] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!careerGoal) return alert("Please select a career goal");

    setLoading(true);
    setError(""); // Reset error state before making request

    try {
      const res = await axios.post("http://localhost:5000/api/learning-path", {
        careerGoal,
      });
      
      // Log the response for debugging
      console.log("Response:", res);

      // Ensure response has the expected data structure
      if (res.data && res.data.roadmap) {
        setRoadmap(res.data.roadmap);
        setCompletedSteps(new Array(res.data.roadmap.length).fill(false)); // Initialize steps as not completed
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      setError("Failed to generate roadmap. Please try again later.");
    }
    setLoading(false);
  };

  const toggleCompletion = (index) => {
    const updatedSteps = [...completedSteps];
    updatedSteps[index] = !updatedSteps[index];
    setCompletedSteps(updatedSteps);
  };

  const filteredCareerGoals = allCareerGoals.filter((goal) =>
    goal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white py-24 px-6">
      <motion.div
        className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg rounded-3xl border border-purple-700 p-10 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-purple-300 mb-8 text-center">
          📚 Smart Learning Path
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="🔍 Search Career Goal"
            className="w-full p-3 rounded-xl bg-purple-900 border border-purple-500 text-white shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            className="w-full p-3 rounded-xl bg-purple-900 border border-purple-500 text-white shadow-md"
          >
            <option value="">🎯 Select Career Goal</option>
            {filteredCareerGoals.length > 0 ? (
              filteredCareerGoals.map((goal, index) => (
                <option key={index} value={goal}>
                  {goal}
                </option>
              ))
            ) : (
              <option value="">No matching career goals</option>
            )}
          </select>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl shadow-md font-semibold"
          >
            {loading ? "⏳ Generating..." : "⚡ Generate Path"}
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        {roadmap.length > 0 && (
          <motion.div
            className="bg-purple-900/50 border border-purple-600 p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-purple-200 mb-4">
              📈 Your Personalized Roadmap:
            </h2>
            <ul className="list-decimal list-inside space-y-3 text-purple-100 text-sm md:text-base">
              {roadmap.map((step, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={completedSteps[index]}
                    onChange={() => toggleCompletion(index)}
                    className="mr-2 rounded-lg"
                  />
                  <span
                    className={`${
                      completedSteps[index] ? "line-through text-gray-500" : "text-purple-100"
                    }`}
                  >
                    Step {index + 1}: {step}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LearningPath;