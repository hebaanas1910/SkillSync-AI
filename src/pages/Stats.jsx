import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const sampleStats = [
  { skill: "React", level: 80 },
  { skill: "Node.js", level: 65 },
  { skill: "Python", level: 90 },
  { skill: "Machine Learning", level: 70 },
];

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching
    setTimeout(() => {
      setStats(sampleStats);
      setLoading(false);
    }, 1200);
  }, []);

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Skill,Level", ...stats.map(s => `${s.skill},${s.level}`)].join("\n");
    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", "skill_stats.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 px-6 pb-16 min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-purple-300 mb-10 text-center"
      >
        📈 Skill Progress Stats
      </motion.h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="bg-purple-800/40 backdrop-blur-md p-5 rounded-2xl text-center border border-purple-600 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-purple-200">{stat.skill}</h3>
                <CircularProgressbar
                  value={stat.level}
                  text={`${stat.level}%`}
                  styles={buildStyles({
                    pathColor: "#a78bfa",
                    textColor: "#ffffff",
                    trailColor: "#4c1d95",
                  })}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white font-semibold shadow-md"
            >
              <FaDownload /> Download CSV
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;
