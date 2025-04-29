const Assignment = require("../model/AssignmentModel");
const SubmitAssignment = require('../model/SubmitAssignment')

const createAssignment = async (req, res) => {
    try {
        const { name, date, lastDate } = req.body;

        // Step 1: Check if file exists
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Step 2: Create assignment
        const assignment = await Assignment.create({
            name,
            date,
            lastDate,
            fileBuffer: req.file.buffer,
            file: req.file.originalname,
        });

        res.status(201).json({ message: "Assignment Uploaded", assignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong on the server" });
    }
};

const allAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        if (assignments.length === 0) {
            return res.status(400).json({ message: "No Assignment Available now" });
        }
        res.status(200).json(assignments);
    } catch {
        res.status(500).json({ Error: "Something Went Wrong" });
    }
};

const assignmentDownload = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).send("File not found");
        }

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${assignment.file}"`
        );
        res.setHeader("Content-Type", "application/pdf");
        res.send(assignment.fileBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Something went wrong" });
    }
};


const Submit = async (req, res) => {
    try {
        // Ensure a file was uploaded
        if (!req.file) {
            return res.status(400).json({ Error: "No file uploaded" });
        }

        // Save the file details to the database
        const Submitted = await SubmitAssignment.create({
            file: req.file.originalname,  // Store the file's original name
            fileBuffer: req.file.buffer,  // Store the file's binary data
        });

        // Respond with a success message
        res.status(200).json({ Message: "Submitted Successfully" });

    } catch (error) {
        console.error(error);
        // Handle potential errors and respond with an appropriate message
        return res.status(500).json({ Error: "Something went wrong", Details: error.message });
    }
};

  








const allSubmit = async (req, res) => {
    try {
      const Submitted = await SubmitAssignment.find()
        // .populate("assignment", "name file") // Only pick assignment name and file
        // .populate("student", "name"); // If you want student name too (optional)
  
      if (Submitted.length === 0) {
        return res.status(400).json({ message: "No Submit Assignment Available now" });
      }
  
      res.status(200).json(Submitted);
    } catch (error) {
      console.error(error);
      res.status(500).json({ Error: "Something Went Wrong" });
    }
  };
  
  const downloadSubmittedAssignment = async (req, res) => {
    try {
      const submit = await SubmitAssignment.findById(req.params.id);
      if (!submit) {
        return res.status(404).send("Submission not found");
      }
  
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${submit.file}"`
      );
      res.setHeader("Content-Type", "application/pdf");
      res.send(submit.fileBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ Error: "Something Went Wrong" });
    }
  };
  


const submitById = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await SubmitAssignment.findOne({_id: id});
        if (!assignment) {
            return res.status(404).json({ Error: "Assignment Not available" })
        }
        return res.status(200).json({ Message: "Assignment Available", assignment })
    }
    catch {
        res.status(500).json({ Error: "Something Went Wrong" })
    }
}
module.exports = {
    createAssignment,
    allAssignments,
    assignmentDownload,
    Submit,
    allSubmit,
    submitById,
    downloadSubmittedAssignment
};
