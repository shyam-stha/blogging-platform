import Joi from 'joi';

const createCategory = {
    body: Joi.object().keys({
        title: Joi.string().required()
    })
};

export default {createCategory};
