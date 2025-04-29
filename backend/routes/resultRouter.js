const express = require('express');
const router = express.Router();
const { createResult,
    allResult,
    updateResult,
    deleteResultById,
    resultById,resultByUsername } = require('../controller/resultController');




router.get('/allResult', allResult);
router.get('/allResult/:username', resultByUsername);
router.get('/result/:id', resultById);
router.post('/createResult', createResult);
router.put('/updateResult/:id', updateResult);
router.delete('/deleteResult/:id', deleteResultById);


module.exports = router;