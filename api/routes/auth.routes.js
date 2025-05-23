import express from 'express';
import { register, login, googleAuth } from '../controllers/auth.controller.js';
const router = express();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth)

export default router;