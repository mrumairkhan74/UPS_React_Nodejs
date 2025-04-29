import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
// import TeacherNavbar from "./navbars/TeacherNavbar";
import { Link } from "react-router-dom";
// import Result from "./Result/Result";

const Teacher = () => {
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

  // Handle delete
  const handleDelete = async (id) => {
    const confirmToast = toast(
      <div className="flex justify-between items-center">
        <span>Are you sure you want to delete this course?</span>
        <div className="space-x-2">
          <button
            className="bg-red-500 text-white py-1 px-3 rounded-md"
            onClick={() => confirmDeletion(id)}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white py-1 px-3 rounded-md"
            onClick={() => toast.dismiss(confirmToast)}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: true,
        closeButton: false,
      }
    );
  };

  // Confirm deletion function
  const confirmDeletion = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:3000/course/delete/${id}`
      );
      if (response.status === 200) {
        toast.success("Course deleted successfully!", { autoClose: 1000 });
        fetchData();
      } else {
        setError("Delete Failed");
        toast.error("Course deletion failed!", { autoClose: 1000 });
      }
    } catch (err) {
      setError("Something went wrong or server error");
      toast.error("Server error!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* <TeacherNavbar /> */}
        <h1 className="text-3xl font-extrabold text-center mb-4 text-indigo-700">
          Teacher Dashboard
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
                    <tr
                      key={course._id}
                      className="hover:bg-gray-100 transition duration-300"
                    >
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{course.name}</td>
                      <td className="border px-4 py-2">{course.description}</td>
                      <td className="border px-4 py-2">{course.duration}</td>
                      <td className="border px-4 py-2">{course.fee}</td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex gap-4 items-center">
                          <Link
                            className=" flex gap-2 items-center bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md shadow-md"
                            to={`/teacher/updatecourse/${course._id}`}
                            title="Update Course "
                          >
                            <AiOutlineCheck /> Update
                          </Link>
                          <button
                            className=" flex gap-2 items-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md"
                            onClick={() => handleDelete(course._id)}
                            title="Delete Course"
                          >
                            <AiOutlineClose /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default Teacher;
