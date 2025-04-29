import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Assignment = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/assignment/allAssignment"
      );
      setItems(res.data);
    } catch {
      setError("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!name || !date || !lastDate || !file) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create a FormData object to send file and other data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date);
      formData.append("lastDate", lastDate);
      formData.append("file", file); // Append file from state

      // Make POST request with the FormData
      const res = await axios.post(
        "http://localhost:3000/assignment/createAssignment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure to set the correct content-type
          },
        }
      );

      // Navigate to another page after successful upload
      navigate("/teacher");
    } catch (err) {
      console.error(err);
      setError("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 ">
        <div className="relative flex items-center justify-center py-16">
          <form
            className="bg-white w-full sm:w-[50%] rounded-md p-10 shadow-md shadow-purple-500/50 z-10"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center justify-center">
              <img
                src="/images/ups-w.png"
                className="w-24 h-24 sm:w-50 sm:h-50 mix-blend-multiply"
                alt="UPS Logo"
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <h1 className="text-center m-2 p-2 text-3xl">
                Create Assignment
              </h1>
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
                  type="date"
                  placeholder="Description"
                  className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Enter Duration"
                  className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
                  required
                  value={lastDate}
                  onChange={(e) => setLastDate(e.target.value)}
                />
                <input
                  type="file"
                  className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
                  required
                  onChange={(e) => setFile(e.target.files[0])} // Fix here
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
                {loading ? "Creating..." : "Create Assignment"}
              </button>
              {error && (
                <div className="text-red-500 text-center mt-4">
                  <p>{error}</p>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="w-full p-10 mt-10 ">
          {loading ? (
            <p className="text-white text-center">Loading...</p>
          ) : error ? (
            <p className="text-white text-center">{error}</p>
          ) : items.length > 0 ? (
            <table className="min-w-full border-collapse border text-white border-gray-500">
              <thead className="">
                <tr>
                  <th className="p-2 border">Sr#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Last Date</th>
                  <th className="p-2 border">File</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{item.date}</td>
                    <td className="p-2 border">{item.lastDate}</td>
                    <td className="p-2 border flex flex-col gap-1 items-center">
                      <span>{item.file}</span>
                      <a
                        href={`http://localhost:3000/assignment/download/${item._id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-purple-700"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-white text-center">No Assignment Available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Assignment;
