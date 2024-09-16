import { exportAllUser as exportAllUser_service} from "../services/functions.service.js"
import { encryptFile as encryptFile_service, decryptFile as decryptFile_service } from "../services/cryptography.service.js"

import { constants } from "../services/utils/constants.js"

const { status } = constants.response

const exportAllUser = async (req, res) => {

    const user_db = await exportAllUser_service(req.body)
    res.status(status.OK).json(user_db)
}

const encryptFile = async (req, res) => {

    const user_db = await encryptFile_service(req.body)
    res.status(status.OK).json(user_db)
}

const decryptFile = async (req, res) => {

    const user_db = await decryptFile_service(req.body)
    res.status(status.OK).json(user_db)
}

export { exportAllUser, encryptFile, decryptFile }