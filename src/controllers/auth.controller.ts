import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../utils/helpers/asyncHandler.js';
import authService from '../services/auth.service.js';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.createUser(req?.body);
    res.status(httpStatus.CREATED).send('User created successfully');
});

const userLogin = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.login(req.body);
    res.status(httpStatus.OK).json(user);
});

export default {
    registerUser,
    userLogin
};
