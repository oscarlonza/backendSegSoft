import {exportAllUser as exportAllUser_service} from "../services/functions.service.js"
import { constants } from "../services/utils/constants.js"

const { status } = constants.response

const exportAllUser = async (req, res) => {

    const user_db = await exportAllUser_service(req.body)
    res.status(status.OK).json(user_db)
}

export {exportAllUser}