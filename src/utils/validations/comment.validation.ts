import Joi from 'joi';

const createComment = {
    body: Joi.object().keys({
        content: Joi.string().required(),
        postId: Joi.string().required()
    })
};

export default { createComment };
