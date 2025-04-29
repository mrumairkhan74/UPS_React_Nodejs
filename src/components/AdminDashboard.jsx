import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/user/allData");
      setItems(response.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Are you sure you want to delete this student?", {
      closeButton: true,
      autoClose: false,
      progress: 0,
    });

    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    
    if (confirmDelete) {
      setLoading(true);
      try {
        const response = await axios.delete(`http://localhost:3000/user/delete/${id}`);
        
        if (response.status === 200) {
          toast.update(toastId, {
            render: "Student Deleted Successfully",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          fetchData();
        } else {
          toast.update(toastId, {
            render: "Deletion Failed",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
      } catch (err) {
        console.error(err);
        toast.update(toastId, {
          render: "Something Went Wrong or Server Error",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.update(toastId, {
        render: "Deletion Cancelled",
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/user/approved/${id}`
      );

      if (response.status === 200) {
        toast.success("User Approved Successfully");
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, accountStatus: "active" } : item
          )
        );
      } else {
        toast.error("Approval Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error Approving User");
    }
  };

  return (
    <>
      {loading || error ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          {loading && (
            <div className="text-blue-500 flex flex-col items-center">
              <img
                src="/images/ups-w.png"
                alt="Loading..."
                className="w-32 h-32 mb-2"
              />
              <p className="text-purple-500">Loading...</p>
            </div>
          )}
          {error && (
            <p className="text-red-500 text-center mt-4">Error: {error}</p>
          )}
        </div>
      ) : (
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
            Admin Dashboard
          </h1>
          {items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-xs sm:text-sm">
                    <th className="border border-gray-300 px-2 sm:px-4 py-2">#</th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Username</th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Address</th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Role</th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Account Status</th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item._id} className="text-center text-xs sm:text-sm">
                      <td className="border border-gray-300 px-2 sm:px-4 py-2">{index + 1}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 flex items-center justify-center gap-2">
                        <BsFillPersonFill className="text-lg" />
                        {item.name}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.username}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.email}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.address}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.role}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.accountStatus}</td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2">
                        <div className="flex justify-center gap-2">
                          <button
                            className="bg-green-500 p-1 sm:p-2 rounded-md text-white hover:bg-green-700"
                            onClick={() => handleApprove(item._id)}
                          >
                            <AiOutlineCheck />
                          </button>
                          <button
                            className="bg-red-500 p-1 sm:p-2 rounded-md text-white hover:bg-red-700"
                            onClick={() => handleDelete(item._id)}
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && <p className="text-gray-500 text-center">No data available</p>
          )}
        </div>
      )}
      <ToastContainer path="top-right"/>
    </>
  );
};

export default AdminDashboard;
