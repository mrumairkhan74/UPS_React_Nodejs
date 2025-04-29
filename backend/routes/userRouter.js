const express = require('express');
const { createStudent,isLoggedIn,getAllStudents,loginStudent,getAll,deleteById,approvedUser,getById } = require('../controller/ModelController');


const router = express.Router();

router.post('/userCreate',createStudent);
// router.post('/logout',logout);
router.get('/verify',isLoggedIn);
router.get('/student',getAllStudents);
router.post('/login',loginStudent);
router.get('/allData',getAll);
router.get('/getById/:id',getById);
router.delete('/delete/:id',deleteById);
router.put('/approved/:id',approvedUser);


module.exports = router;