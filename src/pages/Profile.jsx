import React, { useState } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Heba Khan",
    email: "heba@example.com",
    role: "Student",
    skills: "Python, AI, ML",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-20 px-6 pb-10 bg-gradient-to-br from-purple-950 to-black text-white">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-purple-300 mb-10 text-center"
      >
        👤 My Profile
      </motion.h2>

      <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-purple-700 rounded-3xl shadow-2xl p-8">
        <form className="space-y-6">
          <FormField label="Full Name" name="name" value={user.name} onChange={handleChange} />
          <FormField label="Email Address" name="email" value={user.email} onChange={handleChange} />
          <FormField label="Role" name="role" value={user.role} onChange={handleChange} />
          <FormField label="Skills" name="skills" value={user.skills} onChange={handleChange} />

          <div className="text-center pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition duration-200 shadow-lg"
            >
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block mb-2 text-purple-300 font-medium">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded-lg bg-purple-900 text-white border border-purple-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

export default Profile;
