import express, { Router } from 'express';
import { jwtStrategy } from '../middlewares/strategy/index.js';
import categoryController from '../controllers/category.controller.js';

const router: Router = express.Router();

router.post('/', jwtStrategy.authenticate('jwt', { session: false }), categoryController.create);
router.get('/', categoryController.findAllCategory);
router.get('/:category', categoryController.findCategoryById);
router.patch('/:category', jwtStrategy.authenticate('jwt', { session: false }), categoryController.updateCategory);
router.delete('/:category', jwtStrategy.authenticate('jwt', { session: false }), categoryController.deleteCategory);

export default router;
