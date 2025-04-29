import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Result from "./Result";
import axios from "axios";

const CreateResult = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [obtainmarks, setObtainmarks] = useState("");
  const [totalmarks, setTotalmarks] = useState("");
  const [remarks, setRemarks] = useState("");
  const [result, setResult] = useState("pass");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:3000/result/allResult/${username}`
      );
      setUsername(res.data); // assuming you return student data
    } catch (err) {
      setError("Student not found");
      setStudent(null);
    }
  };
  useEffect(() => {
    if (obtainmarks && totalmarks) {
      const percentage = (Number(obtainmarks) / Number(totalmarks)) * 100;
      setResult(percentage >= 40 ? "pass" : "fail");
    }
  }, [obtainmarks, totalmarks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        `http://localhost:3000/result/createResult`,
        {
          name,
          username,
          obtainmarks: Number(obtainmarks),
          totalmarks: Number(totalmarks),
          remarks,
          result,
        },
        { withCredentials: true }
      );
      navigate("/teacher/createresult");
    } catch (err) {
      console.error("Error creating result:", err);
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
          <div className="flex justify-center mb-6">
            <img
              src="/images/ups-w.png"
              alt="UPS Logo"
              className="h-24 w-24 object-contain mix-blend-multiply"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Student Result
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-style"
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input-style"
              />
              <input
                type="number"
                placeholder="Marks Obtained"
                value={obtainmarks}
                onChange={(e) => setObtainmarks(e.target.value)}
                required
                className="input-style"
              />
              <input
                type="number"
                placeholder="Total Marks"
                value={totalmarks}
                onChange={(e) => setTotalmarks(e.target.value)}
                required
                className="input-style"
              />
            </div>

            <textarea
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={4}
              className="input-style resize-none"
            />

            <div className="text-center">
              <span
                className={`text-lg font-medium ${
                  result === "pass" ? "text-green-600" : "text-red-500"
                }`}
              >
                Result: {result.toUpperCase()}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                loading
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              }`}
            >
              {loading ? "Creating..." : "Submit Result"}
            </button>

            {error && <p className="text-center text-red-500 mt-2">{error}</p>}
          </form>
        </div>

        {/* Optional Result Display Below */}
        <div className="mt-10 w-full max-w-5xl">
          <Result />
        </div>
      </div>
    </>
  );
};

export default CreateResult;
