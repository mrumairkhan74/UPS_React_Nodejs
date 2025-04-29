import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import TeacherNavbar from "./navbars/TeacherNavbar";
import { Link } from "react-router-dom";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const studentData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:3000/user/student", {
        withCredentials: true,
      });
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setError("Error fetching students");
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    studentData();
  }, []);
  return (
    <>
    {/* <TeacherNavbar/> */}
      {/* Student List Section */}
      <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
          Student List
        </h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {students.map((student) => (
              <tr
                key={student._id}
                className="hover:bg-gray-100 transition duration-300"
              >
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.username}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">{student.address}</td>
                <td className="border px-4 py-2 capitalize">{student.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentTable;
