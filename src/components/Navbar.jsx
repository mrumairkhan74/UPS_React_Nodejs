import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);


  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed! Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getRoleFromPath = () => {
    if (location.pathname.startsWith("/admin")) return "admin";
    if (location.pathname.startsWith("/teacher")) return "teacher";
    if (location.pathname.startsWith("/student")) return "student";
    return null;
  };

  const role = getRoleFromPath();

  const renderLinks = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/studenttable">Manage Student</Link>
            <Link to="/admin/createannouncement">Announcement</Link>
          </>
        );
      case "teacher":
        return (
          <>
            <Link to="/teacher">Home</Link>
            <Link to="/teacher/create">Create Courses</Link>
            <Link to="/teacher/createresult">Create Result</Link>
            <Link to="/teacher/assignment">Assignment</Link>
            <Link to="/teacher/result">Result</Link>
          </>
        );
      case "student":
        return (
          <>
            <Link to="/student">Home</Link>
            <Link to="/student/classes">Courses</Link>
            <Link to={`/student/result/${id}`}>Result</Link>
            <Link to="/student/assignment">Assignments</Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-between items-center w-full px-4 py-2 shadow-md bg-white">
      <div className="flex items-center gap-4">
        <img src="/images/ups-w.png" className="w-24 h-24" alt="Logo" />
      </div>

      <div className="flex gap-4 items-center">
        {renderLinks()}
        {location.pathname !== "/" && (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
