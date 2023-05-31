import { Request, Response } from 'express';
import asyncHandler from '../utils/helpers/asyncHandler.js';
import userService from '../services/user.service.js';
import httpStatus from 'http-status';
import userValidation from '../utils/validations/user.validation.js';
import createHttpError from 'http-errors';

const createProfile = asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = userValidation.createProfile.body.validate(req.body);
    if (error) throw createHttpError(httpStatus.BAD_REQUEST, error.message);

    const profile = await userService.createProfile(value, req.user);
    res.status(httpStatus.CREATED).send('user profile created successfully');
});
const findAllUser = asyncHandler(async (req: Request, res: Response) => {
    const users = await userService.findAllUser();
    res.status(httpStatus.OK).json({ message: 'user fetch successfully', data: users });
});
const findUserDetails = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.viewProfile(req.user);
    res.status(httpStatus.OK).json({ message: 'user profile send successfully', data: user });
});

export default { createProfile, findAllUser, findUserDetails };
