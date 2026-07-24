import Joi from "joi";
export const userValidation = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().min(2).max(50).allow(null, "").messages({
            "string.base": "name matn bo'lishi kerak",
            "string.min": "name kamida 2 ta belgidan iborat bo'lishi kerak",
            "string.max": "name 50 ta belgidan oshmasligi kerak",
        }),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
            "string.email": "email to'g'ri email formatida bo'lishi kerak",
            "string.empty": "email bo'sh bo'lishi mumkin emas",
            "any.required": "email kiritilishi shart",
        }),
        password: Joi.string()
            .min(6)
            .max(255)
            .pattern(new RegExp("^[a-zA-Z0-9!@# ]+$"))
            .required()
            .messages({
            "string.pattern.base": "Parol faqat harf, raqam va maxsus belgilar (!, @, #) dan iborat bo'lishi mumkin",
            "string.empty": "password bo'sh bo'lishi mumkin emas",
            "string.min": "password kamida 6 ta belgidan iborat bo'lishi kerak",
            "string.max": "password 255 ta belgidan oshmasligi kerak",
            "any.required": "password kiritilishi shart",
        }),
        confirm_password: Joi.any().valid(Joi.ref("password")).messages({
            "any.only": "confirm_password parolga mos kelishi kerak",
        }),
        is_active: Joi.boolean().default(false).messages({
            "boolean.base": "is_active boolean qiymat bo'lishi kerak",
        }),
        refresh_token: Joi.string().max(255).allow(null, "").messages({
            "string.max": "Refresh token 255 ta belgidan oshmasligi kerak",
        }),
        verification: Joi.string().max(255).allow(null, "").messages({
            "string.max": "Verification 255 ta belgidan oshmasligi kerak",
        }),
    });
    return userSchema.validate(data, { abortEarly: false });
};
