import Joi from 'joi';

const createProfile = {
    body: Joi.object().keys({
        picture: Joi.string(),
        bio: Joi.string(),
        links: Joi.array()
    })
};

export default { createProfile };
