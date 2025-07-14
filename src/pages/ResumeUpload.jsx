import React, { useState } from "react";
import { motion } from "framer-motion";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [message, setMessage] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setMessage("");
      setKeywords([]);
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a resume first.");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Uploaded: ${data.file}`);
        setKeywords(data.keywords || []);
        setPreview(data.preview || "");
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black text-white flex justify-center items-center px-6 pt-24 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-purple-700 rounded-3xl p-8 shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-purple-300 mb-6 text-center">
          📁 Upload Your Resume
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="w-full p-3 rounded-lg bg-purple-900 text-white border border-purple-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition"
            disabled={loading}
          >
            {loading ? "⏳ Analyzing..." : "🔍 Analyze Resume (AI)"}
          </button>
        </form>

        {fileName && (
          <p className="mt-4 text-green-400 text-sm text-center">
            ✅ Selected File: <strong>{fileName}</strong>
          </p>
        )}

        {message && (
          <p className="mt-2 text-yellow-300 text-center font-medium">{message}</p>
        )}

        {keywords.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-purple-200 mb-2">🧠 Extracted Skills</h3>
            <div className="flex flex-wrap gap-2">
              {keywords.map((skill, index) => (
                <span
                  key={index}
                  className="bg-purple-700/80 border border-purple-500 px-4 py-1 rounded-full text-sm text-white shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {preview && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-purple-200 mb-2">📄 Resume Preview</h3>
            <pre className="bg-gray-900 border border-purple-600 rounded-xl p-4 text-sm max-h-60 overflow-y-auto whitespace-pre-wrap shadow-inner">
              {preview}
            </pre>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ResumeUpload;
