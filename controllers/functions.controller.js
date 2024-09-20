import { exportAllUser as exportAllUser_service } from "../services/functions.service.js"
import { encryptFile as encryptFile_service, decryptFile as decryptFile_service } from "../services/cryptography.service.js"
import { exportFile as exportFile_service } from "../services/utils/utils.js"
import { constants } from "../services/utils/constants.js"

const { status } = constants.response

const exportAllUser = async (req, res) => {

    //const user_db = await exportAllUser_service(req.body, res)
    const user_db = await exportAllUser_service(res)
    res.status(status.OK).json(user_db)
}

const encryptFile = async (req, res) => {

    const user_db = await encryptFile_service(req.body)
    if (user_db.process) {

        const fileName = req.body.fileName || 'encryptedFile.data';
        const encrypted = user_db.data.encrypted;
        const buffer = Buffer.from(encrypted, 'utf8');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', buffer.length);

        // Enviar el stream al cliente
        res.send(buffer);

        //res.status(status.OK).json(user_db)
    } else {
        res.status(status.OK).json(user_db)
    }
}

const decryptFile = async (req, res) => {

    const user_db = await decryptFile_service(req.body)
    if (user_db.process) {

        const fileName = req.body.fileName || 'decryptedFile.data';
        const decrypted = user_db.data.decrypted;
        const buffer = Buffer.from(decrypted, 'utf8');
        const textContent = buffer.toString('utf8');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', buffer.length);

        // Enviar el stream al cliente
        res.send(buffer);

        //res.status(status.OK).json(user_db)
    } else {
        res.status(status.OK).json(user_db)
    }
}

const exportFile = async (req, res) => {

    const user_db = await exportFile_service(req.body)
    res.status(status.OK).json(user_db)
}

export { exportAllUser, encryptFile, decryptFile, exportFile }