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
    } catch (error) {
        throw createHttpError(httpStatus.BAD_REQUEST, 'unable to create category');
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
    } catch (error) {
        throw createHttpError(httpStatus.BAD_REQUEST, 'unable to fetch category');
    }
};
const updateCategory = async (category: string, reqBody: Partial<Category>) => {
    try {
        const response = await prisma.category.update({ data: { ...reqBody }, where: { title: category } });
        return response;
    } catch (error) {
        throw createHttpError(httpStatus.BAD_REQUEST, 'unable to update category');
    }
};
const deleteCategory = async (category: string) => {
    try {
        const response = await prisma.category.delete({ where: { title: category } });
        return response;
    } catch (error) {
        throw createHttpError(httpStatus.BAD_REQUEST, 'unable to delete category');
    }
};

export default { createCategory, findCategoryById, findAllCategory, updateCategory, deleteCategory };
