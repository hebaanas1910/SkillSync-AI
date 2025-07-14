import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("https://skillsync-ai-backend-2.onrender.com/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data.users || []);
    };
    fetchUsers();
  }, []);

  return (
    <div className="pt-24 px-6 pb-16 min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-purple-300 mb-10 tracking-wide"
      >
        🛠 Admin Dashboard
      </motion.h2>

      {users.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-purple-700 shadow-xl backdrop-blur-lg bg-white/5">
          <table className="min-w-full text-sm text-white">
            <thead>
              <tr className="text-left text-purple-400 border-b border-purple-800">
                <th className="p-5">👤 Name</th>
                <th className="p-5">📧 Email</th>
                <th className="p-5">🔐 Role</th>
                <th className="p-5">🟢 Status</th>
                <th className="p-5">⚙️ Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-purple-800 hover:bg-purple-800/30 transition"
                >
                  <td className="p-5 font-medium">{user.name}</td>
                  <td className="p-5">{user.email}</td>
                  <td className="p-5 capitalize">{user.role || "user"}</td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-600 text-white"
                          : "bg-yellow-400 text-black"
                      }`}
                    >
                      {user.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-5">
                    <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-xs shadow">
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-purple-400 text-center text-lg mt-12">
          🚫 No users found.
        </p>
      )}
    </div>
  );
};

export default Admin;
