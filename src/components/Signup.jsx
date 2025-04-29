import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

const Signup = () => {
  // for submitting data
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    // Show "Processing..." toast when the form is submitted
    toast.info("Signing up, please wait...", { autoClose: 2000 });

    try {
      const response = await axios.post(
        "http://localhost:3000/user/userCreate",
        { name, username, email, dob, address, password, role },
        { withCredentials: true }
      );

      if (response.data.message === "Registered Successfully") {
        // Show success toast
        toast.success('Registered Successfully. Please wait for Admin Approval', {
          autoClose: 3000, // Automatically close after 3 seconds
        });
        localStorage.setItem("token", response.data.token);
        navigator("/");
      } else {
        // Show error toast
        toast.error('Signup Failed', { autoClose: 2000 });
        setError(response.data.message || "Signup Failed");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data === email) {
        setError("Email Already Registered");
        toast.error("Email Already Registered", { autoClose: 2000 });
        return;
      }
      setError("Something Went Wrong or Server Error");
      toast.error("Something Went Wrong", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-96 relative bg-gradient-to-r from-indigo-600 to-purple-600">
      <form
        className="bg-white w-full sm:w-[50%] rounded-md p-10 shadow-md shadow-purple-500/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 my-50"
        onSubmit={handleSignup}
      >
        <div className="flex items-center justify-center">
          <img
            src="./images/ups-w.png"
            className="w-24 h-24 sm:w-50 sm:h-50 mix-blend-multiply"
            alt="Signup Logo"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
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
              placeholder="Enter Username"
              className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="date"
              className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Address"
              className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <fieldset className="border border-black p-2 w-full rounded-md mt-4 flex gap-4 items-center">
            <legend className="px-2">Role</legend>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-black rounded-md p-2 w-full focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </fieldset>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
            <input
              type="text"
              placeholder="Enter Email"
              className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="border border-black p-2 w-full rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="mt-2">
            Already have an account?{" "}
            <a href="/" className="text-indigo-500">
              Login
            </a>
          </p>

          <button
            className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md mt-4 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-800 cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Signup"}
          </button>

          {error && (
            <div className="text-red-500 text-center mt-4">
              <p>{error}</p>
            </div>
          )}
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Signup;
