const express = require('express');
const router = express.Router();

const {createAnnouncement,getAnnouncement,deleteAnnouncement} = require('../controller/AnnouncementController');


router.get('/getAnnouncement',getAnnouncement);
router.post('/createAnnouncement',createAnnouncement);
router.delete('/deleteAnnouncement',deleteAnnouncement);



module.exports = router;