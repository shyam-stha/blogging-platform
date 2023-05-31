import Joi from 'joi';

const createPost = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
        category:Joi.array()
    })
};


export default {createPost}