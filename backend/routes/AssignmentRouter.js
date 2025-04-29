const express = require('express');
const router = express.Router();
const { upload } = require('../config/upload');

const { createAssignment, allAssignments, assignmentDownload, downloadSubmittedAssignment, Submit, allSubmit, submitById } = require('../controller/AssignmentController');


router.post('/createAssignment', upload.single('file'), createAssignment);
router.post('/submit', upload.single('file'), Submit);
router.get('/allAssignment', allAssignments);
router.get('/allSubmittedAssignment', allSubmit);
router.get('/download/:id', assignmentDownload);
router.get('/submitById/:id', submitById);
router.get('/submittedDownload/:id', downloadSubmittedAssignment);



module.exports = router;