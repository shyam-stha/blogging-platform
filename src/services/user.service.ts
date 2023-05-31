import createHttpError from 'http-errors';
import { Profile } from '@prisma/client';
import httpStatus from 'http-status';
import bcryptService from './bcrypt.service.js';
import prisma from '../config/prisma.config.js';

const isValidPassword = async (hashPassword: string, password: string): Promise<any> => {
    try {
        const isValidPassword = await bcryptService.comparePassword(password, hashPassword);
        if (!isValidPassword) throw createHttpError(httpStatus.UNAUTHORIZED, 'email or password incorrect');
        return isValidPassword;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

const findUserByEmail = async (email: string): Promise<any> => {
    try {
        const user = await prisma.user.findFirst({ where: { email: email } });
        return user;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

const createProfile = async (reqBody: Profile, user: any) => {
    try {
        const { bio, links, picture } = reqBody;
        const profile = await prisma.profile.upsert({
            where: { userId: user.id },
            create: { bio, links, picture, userId: user.id },
            update: { bio, links, picture, userId: user.id }
        });
        return profile;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

const findAllUser = async () => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, name: true, createdAt: true, profile: true }
        });
        if (!users) throw createHttpError(httpStatus.NOT_FOUND, 'users not found');
        return users;
    } catch (error: any) {
        throw createHttpError(error.satatusCode, error.message);
    }
};

const viewProfile = async (user: any) => {
    try {
        const userDetails = await prisma.user.findUnique({
            where: { id: user.id },
            select: { name: true, email: true, profile: true }
        });
        if (!userDetails) throw createHttpError(httpStatus.NOT_FOUND, 'user not found');
        return userDetails;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

export default { isValidPassword, findUserByEmail, createProfile, findAllUser, viewProfile };
