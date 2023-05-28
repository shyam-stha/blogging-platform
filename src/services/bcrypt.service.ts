import bcrypt from 'bcryptjs';

const createPasswordHash = async (password: string): Promise<string> => {
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    } catch (error) {
        throw Error('Cannot create hash');
    }
};

const comparePassword = async (password: string, hashPassword: string) => {
    try {
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;
    } catch (error) {
        throw Error('Cannot compare password');
    }
};

export default {
    createPasswordHash,
    comparePassword
};
