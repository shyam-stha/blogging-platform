import express from 'express';
import authRoutes from './auth.routes.js';
import postRoutes from './post.routes.js';
import categoryRouter from './category.route.js';
import commentRouter from './comment.routes.js';
import userRouter from './user.routes.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/post', postRoutes);
router.use('/category', categoryRouter);
router.use('/comment', commentRouter);
router.use('/user', userRouter);

export default router;
