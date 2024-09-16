import { response } from "./utils/response.js"
import User from '../models/user.js'
import { export_regex, encrypt_regex } from "./validations/functions.validations.js"
import fs from 'fs/promises'
import path from 'path'

const exportAllUser = async export_request => {

    const { error } = export_regex.validate(export_request)
    if (error) return response(false, error.details[0].message)

    const outputFilePath = path.join(export_request.outputFilePath);

    const allUser = await User.find({});
    const dataString = allUser.map(doc => JSON.stringify(doc)).join('\n');

    // Escribir la cadena en un archivo
    try {
        await fs.writeFile(outputFilePath, dataString, 'utf8');
        return response(true, `Datos exportados a ${outputFilePath}`, { allUser });
    } catch (err) {
        return response(false, 'Error al escribir el archivo: ', err);
    }
}

export { exportAllUser }