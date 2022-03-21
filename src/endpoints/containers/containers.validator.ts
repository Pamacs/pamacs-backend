import * as Joi from "joi";

export function containerCreationAndOperationValidator(data: object) {
    const schema = Joi.object({
        name: Joi.string().allow(null, ''),
        note: Joi.string().allow(null, '')
    });
    return schema.validate(data);
}
