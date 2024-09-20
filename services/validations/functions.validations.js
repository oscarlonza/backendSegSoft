import Joi from "joi"

const export_regex = Joi.object({
    outputFilePath: Joi.string().required()
})

const encrypt_regex = Joi.object({
    inputKey: Joi.string().min(4).max(256).required(),
    //fileName: Joi.string().min(4).max(256).required(),
    fileData: Joi.string().required()//,
    //inputFilePath: Joi.string().required(),
    //outputFilePath: Joi.string().required()
})

const decrypt_regex = Joi.object({
    inputKey: Joi.string().min(4).max(256).required(),
    fileData: Joi.string().required()
    //inputFilePath: Joi.string().required(),
    //outputFilePath: Joi.string().required()
})

export {
    export_regex,
    encrypt_regex,
    decrypt_regex
}