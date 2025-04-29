import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error
    setLoading(true); // Start loading state

    // Determine if the input is email or username
    const loginData = email.includes('@') ? { email, password } : { username, password };

    try {
      // Make the API call for login
      const response = await axios.post(
        "http://localhost:3000/user/login",
        loginData,
        { withCredentials: true } // Enable cookie-based session handling
      );

      // If login is successful, handle role-based navigation
      if (response.status === 200) {
        const { role, accountStatus } = response.data;

        // Show success toast notification
        toast.success("Logged in successfully!", {
          position: "top-center",
          autoClose: 2000,
        });

        // Role-based navigation
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "teacher" && accountStatus === "active") {
          navigate("/teacher");
        } else if (role === "student" && accountStatus === "active") {
          navigate("/student");
        } else {
          // Account is pending approval
          toast.info("Please wait for admin approval.", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Handle different types of errors
      if (err.response?.status === 404) {
        setError("Invalid credentials");
        toast.error("Invalid credentials. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      } else if (err.response?.status === 400) {
        setError("Invalid password");
        toast.error("Invalid password. Please check and try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="w-full h-96 relative shadow-lg shadow-purple-500/50 bg-gradient-to-r from-indigo-600 to-purple-600">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full sm:w-[50%] rounded-md p-10 shadow-lg shadow-purple-500/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 my-50"
      >
        <div className="flex items-center justify-center mb-4">
          <img
            src="./images/ups-w.png"
            className="w-24 h-24 sm:w-50 sm:h-50 mix-blend-multiply"
            alt="Logo"
          />
        </div>

        {error && (
          <div className="text-red-500 text-center mt-4">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Enter Email or Username"
            className="border border-black p-2 w-[80%] sm:w-[90%] rounded-md m-2 focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
            value={email || username}
            onChange={(e) => {
              const value = e.target.value;
              if (value.includes("@")) {
                setEmail(value);
              } else {
                setUsername(value);
              }
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="border border-black p-2 w-[80%] sm:w-[90%] rounded-md m-2 focus:outline-2 focus:outline-offset-2 focus:outline-purple-500 active:bg-purple-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between gap-4 w-full mt-2">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="text-indigo-500">
                Signup
              </a>
            </p>
            <p className="text-indigo-500">Forget Password?</p>
          </div>
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-800 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      {/* Toast Container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
