import Joi from "joi"

const export_regex = Joi.object({
    path_export: Joi.string().required()
})

export {
    export_regex
}