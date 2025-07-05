import React from "react";

const ExportReport = ({ questions, codes, results, xp, timeTaken }) => {
  const handleExport = () => {
    const report = questions.map((q, i) => ({
      question: q.question,
      userCode: codes[i],
      result: results[i] ? "✅ Correct" : "❌ Incorrect",
    }));

    const blob = new Blob([JSON.stringify({ xp, timeTaken, report }, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mock_report.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="px-6 py-2 mt-4 bg-yellow-500 text-black rounded shadow hover:bg-yellow-600"
    >
      📄 Export Score Report
    </button>
  );
};

export default ExportReport;
