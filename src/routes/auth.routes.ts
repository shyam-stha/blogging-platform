import express from 'express';
import authController from '../controllers/auth.controller.js';
import localStrategy from '../config/local.strategy.js';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', localStrategy.authenticate('local', { session: false }), authController.userLogin);

export default router;
