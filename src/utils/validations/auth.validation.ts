import Joi from 'joi';

const registerUser = {
    body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().required(),
        password: Joi.string().required()
    })
};

const loginUser = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
};

export default { registerUser, loginUser };
