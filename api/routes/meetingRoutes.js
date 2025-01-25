import express from "express"
const router = express()
import { createMeeting, joinMeeting, exitMeeting, closeMeeting } from "../controllers/meetingController.js";


router.post('/create', createMeeting);
router.post('/join', joinMeeting);
router.post('/exit', exitMeeting);
router.post('/close', closeMeeting);

export default router;