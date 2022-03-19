import * as Joi from "joi";

export function registerValidator(data: object) {
    const schema = Joi.object({
        password: Joi.string().required(),
        register_key: Joi.string()
    });
    return schema.validate(data);
}

export function loginValidator(data: object) {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}
