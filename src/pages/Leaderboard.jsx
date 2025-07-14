import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/leaderboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error("❌ Failed to load leaderboard", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold text-purple-300 text-center mb-6">
        🏆 Leaderboard
      </h1>
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-xl shadow-md border border-purple-700">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-purple-600 text-purple-400">
              <th className="py-2">Rank</th>
              <th className="py-2">Name</th>
              <th className="py-2">Score</th>
              <th className="py-2">Level</th>
              <th className="py-2">Time Taken (s)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="hover:bg-purple-800/30">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{entry.name}</td>
                <td className="py-2">{entry.score}</td>
                <td className="py-2">{entry.level}</td>
                <td className="py-2">{entry.timeTaken}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
