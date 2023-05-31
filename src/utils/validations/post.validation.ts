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
        title: Joi.string().optional(),
        category: Joi.string().optional(),
        author: Joi.string().optional(),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional()
    })
};

export default { createPost,postQuery };
