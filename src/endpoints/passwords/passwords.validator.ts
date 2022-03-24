import * as Joi from "joi";

const passwordSchema = Joi.object({
    name: Joi.string().allow(null, ''),
    login_name: Joi.string().allow(null, ''),
    password: Joi.string().allow(null, ''),
    note: Joi.string().allow(null, ''),
    client_id: Joi.string().required()
});

export function passwordAddValidator(data: object) {
    const schema = Joi.array().items(passwordSchema.required());

    return schema.validate(data);
}

export function passwordEditValidator(data: object) {
    return passwordSchema.validate(data);
}
