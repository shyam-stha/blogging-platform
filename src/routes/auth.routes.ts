import express from 'express';
import authController from '../controllers/auth.controller.js';
import passport from '../config/local.strategy.js';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', passport.authenticate('local', { session: false }), authController.userLogin);

export default router;
