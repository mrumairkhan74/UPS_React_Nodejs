import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoursesStd = () => {
    const {id} = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("studentInfo"));

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/course/allCourse");
      setCourses(response.data.course || []);
    } catch (err) {
      setError("Error! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Applied = async (courseId) => {
    // Get student info from localStorage
    const student = JSON.parse(localStorage.getItem("studentInfo"));
  
    if (!student || !student.email) {
      toast.error("You must be logged in to apply.");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:3000/course/${id}/apply`,
        { studentID: student.email }  // You may change this based on the field you're using
      );
      toast.success("Applied Successfully");
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-extrabold text-center mb-4 text-indigo-700">
        Courses
      </h1>

      {loading || error ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          {loading && (
            <p className="text-purple-500 animate-pulse">Loading...</p>
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg mb-6">
          {courses.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Course Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                  <th className="px-4 py-2 text-left">Fee</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50">
                {courses.map((course, index) => (
                  <tr key={course._id} className="hover:bg-gray-100 transition duration-300">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{course.name}</td>
                    <td className="border px-4 py-2">{course.description}</td>
                    <td className="border px-4 py-2">{course.duration}</td>
                    <td className="border px-4 py-2">{course.fee}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        onClick={() => Applied(course._id)}
                      >
                        Apply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center">No courses available.</p>
          )}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default CoursesStd;
