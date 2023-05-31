import express, { Router } from 'express';
import { jwtStrategy } from '../middlewares/strategy/index.js';
import commentController from '../controllers/comment.controller.js';

const router: Router = express.Router();

router.post('/', jwtStrategy.authenticate('jwt', { session: false }), commentController.create);
router.patch('/:id', jwtStrategy.authenticate('jwt', { session: false }), commentController.updateComment);
router.delete('/:id', jwtStrategy.authenticate('jwt', { session: false }), commentController.deleteComment);

export default router;
