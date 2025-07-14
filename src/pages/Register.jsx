import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://skillsync-ai-backend-2.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black flex items-center justify-center px-4 text-white">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-lg p-8 border border-purple-700 rounded-3xl w-full max-w-md shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-purple-300 text-center mb-8">
          📝 Register
        </h2>

        {["name", "email", "password"].map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm text-purple-200 mb-1 capitalize">
              {field}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-purple-900 text-white rounded-lg border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold shadow-md transition"
        >
          🚀 Register Now
        </button>
      </motion.form>
    </div>
  );
};

export default Register;
