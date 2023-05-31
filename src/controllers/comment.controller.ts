import { Request, Response } from 'express';
import asyncHandler from '../utils/helpers/asyncHandler.js';
import commentService from '../services/comment.service.js';
import httpStatus from 'http-status';
import commentValidation from '../utils/validations/comment.validation.js';
import createHttpError from 'http-errors';

const create = asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = commentValidation.createComment.body.validate(req.body);
    if (error) throw createHttpError(httpStatus.BAD_REQUEST, error.message);

    const comment = await commentService.create(value, req.user);
    res.status(httpStatus.CREATED).send('comment added successfully');
});
const updateComment = asyncHandler(async (req: Request, res: Response) => {
    const response = await commentService.updateComment(req.params.id, req.body, req.user);
    res.status(httpStatus.OK).send('comment updated successfully');
});
const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const response = await commentService.deleteComment(req.params.id, req.user);
    res.status(httpStatus.OK).send('comment deleted successfully');
});

export default { create, updateComment, deleteComment };
