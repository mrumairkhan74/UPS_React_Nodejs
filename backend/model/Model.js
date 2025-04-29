const mongoose = require('mongoose');
const connection = require('../connection/connection')
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        lowercase: true, // Ensures usernames are stored in lowercase
        trim: true, // Removes whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    accountStatus: {
        type: String,
        enum: ['pending', 'active'],
        default: 'pending',
        required: true,
    },
    dob: {
        type: Date,
        required:true
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    role:{
        type:String,
        enum:['student','teacher'],
        default:'student',
        required:true,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
}, { timestamps: true }); // Adds createdAt & updatedAt fields automatically

const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;
