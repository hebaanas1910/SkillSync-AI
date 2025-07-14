import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://skillsync-ai-backend-2.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
      } else {
        localStorage.setItem("token", data.token);
        alert("✅ Login successful!");
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 to-black px-6 py-24 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-purple-600"
      >
        <h2 className="text-4xl font-bold text-center text-purple-300 mb-8">
          🔐 Login to SkillSync AI
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">📧 Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-purple-900 text-white border border-purple-500 shadow-inner"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">🔑 Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-purple-900 text-white border border-purple-500 shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition shadow-md"
          >
            🚀 Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-purple-300">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="underline cursor-pointer hover:text-purple-400"
          >
            Register here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
