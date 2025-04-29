const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: String,
        enum: ['teacher', 'admin'],
        default: 'admin'
    }
}, { timestamps: true });

const Announcement = mongoose.model('announcement', announcementSchema);

module.exports = Announcement;