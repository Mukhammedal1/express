import Joi from "joi";
export const taskValidation = (data) => {
    const taskSchema = Joi.object({
        title: Joi.string().min(2).max(255).required().messages({
            "string.base": "title matn bo'lishi kerak",
            "string.empty": "title bo'sh bo'lishi mumkin emas",
            "string.min": "title kamida 2 ta belgidan iborat bo'lishi kerak",
            "string.max": "title 255 ta belgidan oshmasligi kerak",
            "any.required": "title kiritilishi shart",
        }),
        description: Joi.string().max(1000).allow(null, "").messages({
            "string.base": "description matn bo'lishi kerak",
            "string.max": "description 1000 ta belgidan oshmasligi kerak",
        }),
    });
    return taskSchema.validate(data, { abortEarly: false });
};
