import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

import { Link } from "react-router-dom";
import TeacherNavbar from "../navbars/TeacherNavbar";
const Result = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const resultData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:3000/result/allResult", {
          withCredentials: true,
        });
        setResults(res.data);
      } catch (err) {
        console.error("Failed to fetch Result:", err);
        setError("Error fetching Result");
        toast.error("Failed to fetch Result");
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
        resultData();
    }, []);


  return (
    <>
      {/* Student List Section */}
      <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
          Student Result List
        </h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Obtain Marks</th>
              <th className="px-4 py-2 text-left">Total Marks</th>
              <th className="px-4 py-2 text-left">Result</th>
              <th className="px-4 py-2 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {results.map((result) => (
              <tr
                key={result._id}
                className="hover:bg-gray-100 transition duration-300"
              >
                <td className="border px-4 py-2">{result.name}</td>
                <td className="border px-4 py-2">{result.username}</td>
                <td className="border px-4 py-2">{result.obtainmarks}</td>
                <td className="border px-4 py-2">{result.totalmarks}</td>
                <td className="border px-4 py-2 capitalize">{result.result}</td>
                <td className="border px-4 py-2 capitalize">{result.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></>
  )
}

export default Result