import * as Joi from "joi";

export function containerCreationAndOperationValidator(data: object) {
    const schema = Joi.object({
        name: Joi.string(),
        note: Joi.string()
    });
    return schema.validate(data);
}
