import { constants } from "../services/utils/constants.js"
import { response } from "../services/utils/response.js"

const { status, message} = constants.response

const test = (req, res) => {
    res
        .status(status.OK)
        .json(response(true, message.OK))
}

const not_found = (req, res) => {
    res
        .status(status.not_found)
        .json(response(false, message.not_found))
}

export {
    test,
    not_found
}