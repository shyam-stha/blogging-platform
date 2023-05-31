import { Request, Response } from 'express';
import asyncHandler from '../utils/helpers/asyncHandler.js';
import categoryService from '../services/category.service.js';
import httpStatus from 'http-status';
import categoryValidation from '../utils/validations/category.validation.js';
import createHttpError from 'http-errors';

const create = asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = categoryValidation.createCategory.body.validate(req.body);
    if (error) throw createHttpError(httpStatus.BAD_REQUEST, error.message);

    const category = await categoryService.createCategory(value);
    res.status(httpStatus.CREATED).json({ message: 'category created successfully', data: category });
});
const findAllCategory = asyncHandler(async (req: Request, res: Response) => {
    const categories = await categoryService.findAllCategory();
    res.status(httpStatus.OK).json({ message: 'category sent successfully', data: categories });
});
const findCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.findCategoryById(req.params.category);
    res.status(httpStatus.OK).json({ message: 'category sent successfully', data: category });
});
const updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const response = await categoryService.updateCategory(req.params.category, req.body);
    res.status(httpStatus.OK).send('category updated successfully');
});
const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const response = await categoryService.deleteCategory(req.params.category);
    res.status(httpStatus.OK).send('category deleted successfully');
});

export default { create, findAllCategory, findCategoryById, updateCategory, deleteCategory };
