const express = require('express');
const { courseById,createCourse,allCourse,applyCourse,acceptApplication,deleteCourseById, updateCourseById } = require('../controller/CourseController');
const router = express.Router();


router.post('/createCourse',createCourse);
router.post('/:id/apply',applyCourse);
router.get('/allCourse',allCourse);
router.get('/:id',courseById);
router.put('/update/:id',updateCourseById);
router.patch('/:courseId/application/:studentId',acceptApplication);
router.delete('/delete/:id',deleteCourseById);


module.exports = router;