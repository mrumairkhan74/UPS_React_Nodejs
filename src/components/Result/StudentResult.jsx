import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 // 👈 getting student ID

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/result/allResult`);
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching the results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">
        Student Results
      </h1>

      {loading && <p className="text-center text-indigo-500">Loading results...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && results.length === 0 && (
        <p className="text-center text-gray-600">No results found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((res, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-purple-700">
              {res.name}
            </h2>
            <p className="mt-2">
              <strong>Username:</strong> {res.username}
            </p>
            <p>
              <strong>Marks:</strong> {res.obtainmarks}/{res.totalmarks}
            </p>
            <p>
              <strong>Result:</strong>{" "}
              <span
                className={
                  res.result === "fail" ? "text-red-500" : "text-green-600"
                }
              >
                {res.result.toUpperCase()}
              </span>
            </p>
            <p>
              <strong>Remarks:</strong> {res.remarks || "None"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentResult;
