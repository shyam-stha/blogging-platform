import Joi from 'joi';

const createPost = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
        category: Joi.array()
    })
};

const postQuery = {
    query: Joi.object().keys({
        page: Joi.number().optional(),
        title: Joi.number().optional(),
        category: Joi.number().optional(),
        author: Joi.number().optional(),
        startDate: Joi.number().optional(),
        endDate: Joi.number().optional()
    })
};

export default { createPost };
