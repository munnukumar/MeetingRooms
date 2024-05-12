const express = require('express');
const meetingController = require('../controllers/meetingController');

const router = express.Router();


router.post('/schedule-meeting', meetingController.scheduleMeeting);
router.get('/get-meeting', meetingController.getMeeting);

router.delete('/delete-meeting/:id', meetingController.deleteMeeting);

module.exports = router;
