const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: String,
    description: String,
    fee: Number,
    duration: String,
    applications: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        status: { type: String, enum: ['pending', 'accepted'], default: 'pending' }
      }],    
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
