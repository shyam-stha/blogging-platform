import express, { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { jwtStrategy } from '../middlewares/strategy/index.js';

const router: Router = express.Router();

router.post('/profile', jwtStrategy.authenticate('jwt', { session: false }), userController.createProfile);
router.get('/', userController.findAllUser);
router.get('/profile', jwtStrategy.authenticate('jwt', { session: false }), userController.findUserDetails);

export default router;
