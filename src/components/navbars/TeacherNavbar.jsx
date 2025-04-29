import React from "react";
import { Link } from "react-router-dom";
const TeacherNavbar = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <Link to={"/teacher"} className="p-2 m-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md text-white hover:bg-purple-700 hover:underline hover:underline-offset-[5px] hover:decoration-3 active:bg-purple-800 focus:underline-white ">Dashbaord</Link>
        <Link to={"/create"} className="p-2 m-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md text-white hover:bg-purple-700 hover:underline hover:underline-offset-[5px] hover:decoration-3 active:bg-purple-800 focus:underline-white ">Create Course</Link>
        <Link to={"/studenttable"} className="p-2 m-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md text-white hover:bg-purple-700 hover:underline hover:underline-offset-[5px] hover:decoration-3 active:bg-purple-800 focus:underline-white ">Student List</Link>
        <Link to={"/createresult"} className="p-2 m-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md text-white hover:bg-purple-700 hover:underline hover:underline-offset-[5px] hover:decoration-3 active:bg-purple-800 focus:underline-white ">Create Result</Link>
        <Link to={"/result"} className="p-2 m-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md text-white hover:bg-purple-700 hover:underline hover:underline-offset-[5px] hover:decoration-3 active:bg-purple-800 focus:underline-white ">Show Result</Link>
        <Link to={"/annoucement"} className="p-2 m-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md text-white hover:bg-purple-700 hover:underline hover:underline-offset-[5px] hover:decoration-3 active:bg-purple-800 focus:underline-white ">Annoucement</Link>
      </div>
    </>
  );
};

export default TeacherNavbar;
