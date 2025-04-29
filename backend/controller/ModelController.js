const Model = require('../model/Model');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");


const createStudent = async (req, res) => {
  try {
    let { name, username, email, password, address, dob, role } = req.body;
    if (!role || !['student', 'teacher'].includes(role)) {
      role = 'student'; // Assign default role if missing
    }
    // Check if student already exists
    const existingStudent = await Model.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student Already Registered' });
    }
    const parsedDOB = new Date(dob);
    if (isNaN(parsedDOB.getTime())) {
      return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    if (!salt) return res.status(500).json({ message: "Error in Generating salt" })
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) return res.status(500).json({ message: "Error in generating HashPassword" })
    // Create student
    const student = await Model.create({
      name,
      username,
      email,
      password: hashedPassword,
      address,
      dob: parsedDOB,
      status: 'pending',
      role: role || 'student',
    });

    // Generate JWT token
    const token = jwt.sign({ email, username, role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Set token in cookies
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    return res.status(201).json({ message: "Registered Successfully", student });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something Went Wrong' });
  }
};



const loginStudent = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    const user = await Model.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    if (user.accountStatus === "pending") {
      return res.status(401).json({ error: "Please wait for admin approval" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production"
    });

    res.status(200).json({
      message: "Successfully Login",
      email: user.email,
      username: user.username,
      role: user.role,
      accountStatus: user.accountStatus
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ generalError: "Something went wrong" });
  }
};

const approvedUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Model.findByIdAndUpdate(id, { accountStatus: "active" }, { new: true });
    if (!user) {
      res.status(404).json({ message: "User not Found" });
    }
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.cookie("token", token);
    res.status(200).json({ message: "User Approved", user });
  }
  catch (error) {

  }
}
const deleteById = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await Model.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "User Doesn't Available" })
    }
    res.status(200).json({ message: "User Successfully Deleted" })
  }
  catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
// const logout = async (req, res) => {
//     res.clearCookie('token');
// }

const getAll = async (req, res) => {
  try {
    const users = await Model.find(); // Fetch all users
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    // Basic ID validation (example for MongoDB ObjectId)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const student = await Model.findOne({ _id: id }).select('username _id');

    if (!student) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: student.username,
      id: student._id
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message // Optional: only in development
    });
  }
}


// controllers/userController.js

const getAllStudents = async (req, res) => {
  try {
    const students = await Model.find({ role: "student" }).select("-password"); // exclude password
    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};




const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) return res.status(403).json({ message: 'Forbidden' });
    res.json({ id: decoded._id, username: decoded.username });
    next();
  } catch {
    res.status(500).json({ message: "Something Went Wrong" })
  }
}
module.exports = {
  createStudent,
  loginStudent,
  // updateStudent,
  deleteById,
  approvedUser,
  getById,
  // logout,
  getAll,
  isLoggedIn,
  getAllStudents
}