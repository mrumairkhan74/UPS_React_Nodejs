import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeacherNavbar from "../navbars/TeacherNavbar";

const UpdateCourse = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [fee, setFee] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch course data
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/course/${id}`);
      const course = response.data;

      setName(course.name);
      setDescription(course.description);
      setDuration(course.duration);
      setFee(course.fee);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading the course");
      toast.error("Failed to load course data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      toast.error("Invalid course ID");
      navigate("/teacher");
      return;
    }
    fetchData();
  }, [id]);

  // Handle course update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:3000/course/update/${id}`, {
        name,
        description,
        duration,
        fee,
      });

      toast.success("Course updated successfully!");
      navigate("/teacher");
    } catch (err) {
      console.error(err);
      toast.error("Course couldn't be updated: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-course-form">
      {error && <p className="text-red-600">{error}</p>}
      
      <div className="w-full h-72 relative bg-gradient-to-r from-indigo-600 to-purple-600">
        <form
          className="bg-white w-full sm:w-[50%] rounded-md p-10 shadow-md shadow-purple-500/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 my-50"
          onSubmit={handleUpdate}
        >
          <div className="flex items-center justify-center">
            <img
              src="/images/ups-w.png"
              className="w-24 h-24 sm:w-50 sm:h-50 mix-blend-multiply"
              alt="UPS Logo"
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center m-2 p-2 text-3xl tracking-wide">Update Course</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <input
                type="text"
                placeholder="Enter Name"
                className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Duration"
                className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <input
                type="number"
                placeholder="+1234567778"
                className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
                required
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
            </div>

            <button
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md mt-4 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-800 cursor-pointer"
              }`}
              disabled={loading}
            >
              {loading ? "updating..." : "Update Course"}
            </button>
            {error && (
              <div className="text-red-500 text-center mt-4">
                <p>{error}</p>
              </div>
            )}
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UpdateCourse;
