import express, { Router } from 'express';
import postController from '../controllers/post.controller.js';
import { jwtStrategy } from '../middlewares/strategy/index.js';

const router: Router = express.Router();

router.post('/', jwtStrategy.authenticate('jwt', { session: false }), postController.create);
router.get('/', postController.findPosts);
router.get('/:id', postController.findPostById);
router.patch('/:id', jwtStrategy.authenticate('jwt', { session: false }), postController.updatePost);
router.delete('/:id', jwtStrategy.authenticate('jwt', { session: false }), postController.deletePost);

export default router;
