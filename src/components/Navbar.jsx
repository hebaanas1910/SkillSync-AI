import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-black text-white shadow-lg py-4 px-6 fixed w-full top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-purple-300">SkillSync AI</h1>
        <div className="flex items-center space-x-6 text-sm">
          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-purple-300 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-purple-300 font-medium transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="hover:text-purple-300 font-medium transition"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="hover:text-purple-300 font-medium transition"
              >
                Profile
              </Link>
              <Link
                to="/learning-path"
                className="hover:text-purple-300 font-medium transition"
              >
                Learning Path
              </Link>
              <Link
                to="/resume-upload"
                className="hover:text-purple-300 font-medium transition"
              >
                Resume Upload
              </Link>
              <Link
                to="/coding-practice"
                className="hover:text-purple-300 font-medium transition"
              >
                Coding Practice
              </Link>
              <Link
                to="/stats"
                className="hover:text-purple-300 font-medium transition"
              >
                Stats
              </Link>
              <Link
                to="/admin"
                className="hover:text-purple-300 font-medium transition"
              >
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
