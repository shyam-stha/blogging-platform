import Joi from 'joi';

const createPost = {
    body: Joi.object().keys({
        title: Joi.string().required,
        content: Joi.string().required()
    })
};


export default {createPost}