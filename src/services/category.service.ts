import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import prisma from '../config/prisma.config.js';
import { Category } from '@prisma/client';

const createCategory = async (reqBody: Category) => {
    try {
        const { title } = reqBody;
        const category = await prisma.category.upsert({
            where: { title: title },
            create: { title: title },
            update: { title: title }
        });
        return category;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};
const findCategoryById = async (category: string) => {
    try {
        const categoryById = await prisma.category.findUnique({ where: { title: category }, include: { posts: true } });
        return categoryById;
    } catch (error: any) {
        throw createHttpError(httpStatus.BAD_REQUEST, error.message);
    }
};
const findAllCategory = async () => {
    try {
        const categories = await prisma.category.findMany({ include: { posts: true } });
        return categories;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};
const updateCategory = async (category: string, reqBody: Partial<Category>) => {
    try {
        const response = await prisma.category.update({ data: { ...reqBody }, where: { title: category } });
        return response;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};
const deleteCategory = async (category: string) => {
    try {
        const response = await prisma.category.delete({ where: { title: category } });
        return response;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

export default { createCategory, findCategoryById, findAllCategory, updateCategory, deleteCategory };
