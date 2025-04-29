const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    name: String,
    date: {
        type: Date,
        default: Date.now()
    },
    lastDate: Date,
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        default: [] // Initialize the student array to an empty array
    }],
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubmitAssignment",
        default: [] // Initialize the assignments array to an empty array
    }],
    file: {
        type: String
    },
    fileBuffer: {
        type: Buffer
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
