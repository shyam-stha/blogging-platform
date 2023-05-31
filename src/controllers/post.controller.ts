import { Request, Response } from 'express';
import postService from '../services/post.service.js';
import asyncHandler from '../utils/helpers/asyncHandler.js';
import httpStatus from 'http-status';
import createHttpError from 'http-errors';
import postValidation from '../utils/validations/post.validation.js';

const create = asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = postValidation.createPost.body.validate(req.body);
    if (error) throw createHttpError(httpStatus.BAD_REQUEST, error.message);

    const post = await postService.create(value, req.user);
    res.status(httpStatus.CREATED).json({ message: 'post created successfully', data: post });
});

const findPosts = asyncHandler(async (req: Request, res: Response) => {
    const { posts, count } = await postService.findAllPost(req.query);
    res.status(httpStatus.OK).json({ message: 'posts fetched successfully', data: posts, totalCount: count });
});

const findPostById = asyncHandler(async (req: Request, res: Response) => {
    const post = await postService.findPostById(req.params.id);
    res.status(httpStatus.OK).json({ message: 'post fetched successfully', data: post });
});

const updatePost = asyncHandler(async (req: Request, res: Response) => {
    const response = await postService.updatePost(req.params.id, req.body);
    res.status(httpStatus.OK).send('post updated successfully');
});

const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const response = await postService.deletePost(req.params.id);
    res.status(httpStatus.OK).send('post deleted successfully');
});

export default { create, findPosts, findPostById, updatePost, deletePost };
