import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../utils/helpers/asyncHandler.js';
import authService from '../services/auth.service.js';
import authValidation from '../utils/validations/auth.validation.js';
import createHttpError from 'http-errors';

const register = asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = authValidation.registerUser.body.validate(req.body);
    if (error) throw createHttpError(httpStatus.BAD_REQUEST, error.message);

    const user = await authService.create(value);
    res.status(httpStatus.CREATED).send('User created successfully');
});

const login = asyncHandler(async (req: Request, res: Response) => {
     const { error, value } = authValidation.loginUser.body.validate(req.body);
     if (error) throw createHttpError(httpStatus.BAD_REQUEST, error.message);

    const user = await authService.login(value);
    res.status(httpStatus.OK).json(user);
});

export default {
    register,
    login
};
