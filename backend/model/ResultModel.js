const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    obtainmarks: { type: Number, required: true },
    totalmarks: { type: Number, required: true },
    remarks: { type: String },
    result: { type: String, enum: ["pass", "fail"], required: true },
  
}, { timestamps: true })

const Result = mongoose.model('result', resultSchema);
module.exports = Result