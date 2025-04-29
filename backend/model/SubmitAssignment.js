const mongoose = require('mongoose');

const submitSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true,  // Make sure the file name is required
    },
    fileBuffer: {
        type: Buffer,
        required: true,  // Ensure the file buffer is required
    }
});

const SubmitAssignment = mongoose.model('SubmitAssignment', submitSchema);

module.exports = SubmitAssignment;
