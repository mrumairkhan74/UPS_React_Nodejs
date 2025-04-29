import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import Protected from "./components/Protected";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import CreateCourse from "./components/course/CreateCourse";
import UpdateCourse from "./components/course/UpdateCourse";
import CreateResult from "./components/Result/CreateResult";
import StudentTable from "./components/StudentTable";
import Result from "./components/Result/Result";
import Announcement from "./components/Announcement/Announcement";
import CreateAnnouncement from "./components/Announcement/CreateAnnouncement";
import Navbar from "./components/Navbar";
import StudentResult from "./components/Result/StudentResult";
import CoursesStd from "./components/courses/CoursesStd";
import Assignment from "./components/Assignment/Assignment";
import AllAssignment from "./components/Assignment/AllAssignment";
import Submited from "./components/Assignment/Submited";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<Protected />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="teacher" element={<Teacher />} />
            <Route path="student" element={<Student />} />
            <Route path="admin/studenttable" element={<StudentTable />} />
            <Route path="teacher/create" element={<CreateCourse />} />
            <Route path="teacher/updatecourse/:id" element={<UpdateCourse />} />
            <Route path="teacher/createresult" element={<CreateResult />} />
            <Route path="teacher/result" element={<Result />} />
            <Route path="student/result/:id" element={<StudentResult />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route
              path="admin/createAnnouncement"
              element={<CreateAnnouncement />}
            />
            <Route path="student/classes" element={<CoursesStd />} />
            <Route path="student/assignment" element={<AllAssignment />} />
            <Route path="student/submit/:id" element={<Submited />} />
          </Route>
          <Route path="teacher/assignment" element={<Assignment />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
