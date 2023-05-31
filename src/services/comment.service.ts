import { Comment } from '@prisma/client';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import prisma from '../config/prisma.config.js';

const create = async (reqBody: Comment, user: any) => {
    try {
        const { content, postId } = reqBody;

        const comment = await prisma.comment.create({
            data: { content: content, post: { connect: { id: postId } }, author: { connect: { id: user.id } } }
        });
        return comment;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};
const updateComment = async (id: string, reqBody: Partial<Comment>, user: any) => {
    try {
        const response = await prisma.comment.update({ data: { ...reqBody }, where: { id: id } });
        return response;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};
const deleteComment = async (id: string, user: any) => {
    try {
        const response = await prisma.comment.delete({ where: { id: id } });
        return response;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

export default { create, updateComment, deleteComment };
