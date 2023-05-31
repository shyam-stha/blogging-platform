import express, { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { localStrategy } from '../middlewares/strategy/index.js';

const router:Router = express.Router();

router.post('/register', authController.register);
router.post('/login', localStrategy.authenticate('local', { session: false }), authController.login);

export default router;
