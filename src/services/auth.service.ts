import User from '../utils/interfaces/user.js';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import bcryptService from './bcrypt.service.js';
import userService from './user.service.js';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.config.js';
import dotenv from 'dotenv';
dotenv.config();

const create = async (reqBody: User) => {
    try {
        const { name, email, password } = reqBody;
        const isExistingUser = await userService.findUserByEmail(email);
        if (isExistingUser) {
            throw createHttpError(httpStatus.FOUND, 'User with this email already exits');
        } else {
            const hashPassword = await bcryptService.createPasswordHash(password);
            const user = await prisma.user.create({ data: { name, email, password: hashPassword } });
            return user;
        }
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

const login = async (reqBody: { email: string; password: string }): Promise<any> => {
    try {
        const { password, ...rest } = await userService.findUserByEmail(reqBody.email);
        if (!rest) throw createHttpError(httpStatus.NOT_FOUND, 'user with this credential not fount');

        const token = await generateToken(rest);

        return {
            name: rest.name,
            email: rest.email,
            token
        };
    } catch (error: any) {
        throw createHttpError(error.satatusCode, error.message);
    }
};

const generateToken = async (user: any): Promise<string> => {
    const payload = {
        id: user.id,
        email: user.email
    };
    const secret =
        process.env.JWT_SECRET ||
        '15de08acca03ebdc8257b7298fb3c21d7a7819a2fb84ec64c0bf5b229c4c38819b447d19b7e4f7aef52af5268719d9c3';

    return jwt.sign(payload, secret, { expiresIn: '4days' });
};

export default { create, login };
