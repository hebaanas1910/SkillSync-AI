import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      if (isLogin) {
        localStorage.setItem("token", data.token);
        alert("✅ Logged in successfully!");
        navigate("/dashboard");
      } else {
        alert("✅ Registered! Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-28 text-white px-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-6 text-purple-300"
      >
        Welcome to SkillSync AI
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-lg max-w-xl mb-8 text-purple-200"
      >
        Discover your ideal career path and unlock powerful opportunities with AI-powered insights.
      </motion.p>

      <div className="bg-purple-800/30 backdrop-blur-md p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">
          {isLogin ? "🔐 Login" : "📝 Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-purple-900 border border-purple-500"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-purple-900 border border-purple-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-purple-900 border border-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-semibold"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p
          className="mt-4 text-purple-300 cursor-pointer hover:underline text-sm"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
        </p>
      </div>
    </div>
  );
};

export default Home;
