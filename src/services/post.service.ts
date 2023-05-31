import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import prisma from '../config/prisma.config.js';

const create = async (reqBody: any, user: any) => {
    try {
        const { title, content, category } = reqBody;

        const post = await prisma.post.create({
            data: {
                title,
                content,
                categories: {
                    connectOrCreate: category.map((category_title: string) => ({
                        where: { title: category_title },
                        create: { title: category_title }
                    }))
                },
                author: { connect: { id: user.id } }
            },
            include: {
                categories: true
            }
        });
        return post;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

const findAllPost = async (query: any) => {
    try {
        let { page, title, category, author, startDate, endDate } = query;
        page = page || 1;

        const where = {
            OR: [{ title: { contains: title || '' } }, { categories: { some: { title: { contains: category || '' } } } }],
            categories: { some: { title: { contains: category || '' } } },
            author: { name: { contains: author || '' } },
            createdAt: {
                gte: startDate ? new Date(startDate) : undefined,
                lte: endDate ? new Date(endDate) : undefined
            }
        };

        const [posts, count] = await Promise.all([
            await prisma.post.findMany({
                where,
                take: 5,
                skip: (page - 1) * 5,
                orderBy: { createdAt: 'asc' },
                include: {
                    categories: true,
                    author: { select: { id: true, name: true, email: true } },
                    comment: {
                        select: {
                            id: true,
                            content: true,
                            createdAt: true,
                            author: { select: { id: true, name: true, email: true, profile: true } }
                        }
                    }
                }
            }),
            await prisma.post.count()
        ]);
        return { posts, count };
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

const findPostById = async (id: string) => {
    try {
        const post = await prisma.post.findFirst({
            where: { id: id },
            select: {
                id: true,
                title: true,
                content: true,
                author: { select: { id: true, name: true, email: true } },
                categories: { select: { title: true } }
            }
        });
        return post;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

const updatePost = async (id: string, reqBody: any) => {
    try {
        const isPostExist = await checkPostExist(id);
        if (!isPostExist) throw createHttpError(httpStatus.NOT_FOUND, 'no such post is found');
        const response = await prisma.post.update({ data: { ...reqBody }, where: { id: id } });
        return response;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

const deletePost = async (id: string) => {
    try {
        const isPostExist = await checkPostExist(id);
        if (!isPostExist) throw createHttpError(httpStatus.NOT_FOUND, 'no such post is found');
        const respose = await prisma.post.delete({ where: { id: id } });
        return respose;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

const checkPostExist = async (id: string) => {
    try {
        const isPostExist = await prisma.post.findUnique({ where: { id: id } });
        return isPostExist;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

export default { create, findAllPost, findPostById, updatePost, deletePost };
