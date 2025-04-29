import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
// import TeacherNavbar from "./navbars/TeacherNavbar";
import { Link } from "react-router-dom";
// import Result from "./Result/Result";

const Student = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:3000/course/allCourse"
      );
      setCourses(response.data.course || []); // Ensure it's an array
    } catch (err) {
      setError("Error! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* <TeacherNavbar /> */}
        <h1 className="text-3xl font-extrabold text-center mb-4 text-indigo-700">
          All Courses
        </h1>

        {loading || error ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            {loading && (
              <div className="text-blue-500 flex flex-col items-center">
                <img
                  src="/images/ups-w.png"
                  alt="Loading..."
                  className="w-32 h-32 mb-2 animate-bounce"
                />
                <p className="text-purple-500">Loading...</p>
              </div>
            )}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        ) : (
          <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg mb-6">
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-4 border border-gray-200"
                  >
                    <h2 className="text-xl font-semibold text-purple-700">
                      {course.name}
                    </h2>

                    <p>
                      <strong>Description:</strong> {course.description}
                    </p>
                    <p>
                      <strong>Duration:</strong>
                      {course.duration}
                    </p>
                    <p>
                      <strong>Fee:</strong>
                      {course.fee}
                    </p>
                    <div className="p-2">
                      <a className="bg-blue-500 p-2 rounded-md text-white">
                        Apply
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !loading && (
                <p className="text-gray-500 text-center">
                  No courses available.
                </p>
              )
            )}
          </div>
        )}

        {/* Toast Container */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
        />
      </div>
    </>
  );
};

export default Student;
