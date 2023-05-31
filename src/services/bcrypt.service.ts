import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';

const createPasswordHash = async (password: string): Promise<string> => {
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

const comparePassword = async (password: string, hashPassword: string) => {
    try {
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;
    } catch (error: any) {
        throw createHttpError(error.statusCode, error.message);
    }
};

export default {
    createPasswordHash,
    comparePassword
};
