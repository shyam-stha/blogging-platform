import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import bcryptService from './bcrypt.service.js';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});

const isValidPassword = async (hashPassword: string, password: string): Promise<any> => {
    try {
        const isValidPassword = await bcryptService.comparePassword(password, hashPassword);
        return isValidPassword;
    } catch (error) {
        throw createError(httpStatus.BAD_REQUEST, 'unable to verify password');
    }
};

const findUserByEmail = async (email: string): Promise<any> => {
    try {
        const user = await prisma.user.findFirst({ where: { email: email } });
        return user;
    } catch (error) {
        throw createError(httpStatus.BAD_REQUEST, 'unbale to fetch user by email');
    }
};

export default { isValidPassword, findUserByEmail };
