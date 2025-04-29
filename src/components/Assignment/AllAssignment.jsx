import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa6";


const AllAssignment = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [submit, setSubmit] = useState([]);

  // Fetch all assignments
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
    // submitData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="w-full p-10 mt-10">
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-white text-center">{error}</p>
        ) : items.length > 0 ? (
          <table className="min-w-full border-collapse border text-white border-gray-500">
            <thead>
              <tr>
                <th className="p-2 border">Sr#</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Last Date</th>
                <th className="p-2 border">File</th>
                <th className="p-2 border">Submit</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.lastDate}</td>
                  <td className="p-2 border flex flex-col  gap-2 items-center">
                    <span>{item.file}</span>
                    <a
                      href={`http://localhost:3000/assignment/download/${item._id}`}
                      className="hover:bg-blue-500 hover:p-1 hover:rounded-md" title="Download Assignment"
                    >
                      <FaDownload />

                    </a>
                  </td>
                  <td className="p-2 border">
                    <button>
                      <a className="bg-blue-500 p-2 rounded-md" href={`/student/submit/${item._id}}`}>Submit</a>
                    </button>
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
  );
};

export default AllAssignment;
