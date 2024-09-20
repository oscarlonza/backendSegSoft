import Joi from "joi"

const user_regex = Joi.object({
    name: Joi.string().min(4).max(16).required(),
    nickname: Joi.string().min(4).max(16).required(),
    cel: Joi.string().min(10).max(15).required(),
    password: Joi.string().min(8).max(256).required().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&.*]).{8,256}$/)
    .messages({
        'string.pattern.base': 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos 1 número, 1 letra minúscula, 1 letra mayúscula y 1 carácter especial.',
    }),
    confirm_password: Joi.ref('password'),
    email: Joi.string().min(6).max(56).email()
})

const login_regex = Joi.object({
    nickname: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(6).max(256).required()
})

export {
    user_regex,
    login_regex
}