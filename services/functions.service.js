import { response } from "./utils/response.js"
import User from '../models/user.js'

const exportAllUser = async export_res => {

    const allUser = await User.find({});

    if (allUser.length === 0) {
        return response(false, 'No hay datos para exportar.');
    } else {
        const dataString = allUser.map(doc => JSON.stringify(doc)).join('\n');

        try {

            const fileName = 'User_Export.txt';
            const contentType = 'text/plain';

            // Convertir el string a un buffer
            const buffer = Buffer.from(dataString, 'utf8');

            // Configurar los encabezados de respuesta para la descarga del archivo
            export_res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            export_res.setHeader('Content-Type', contentType);
            export_res.setHeader('Content-Length', buffer.length);

            // Enviar el stream al cliente
            export_res.send(buffer);

            //return response(true, 'Archivo generado correctamente: ');

        } catch (err) {
            return response(false, 'Error en la exportación: ', err);
        }
    }
}

export { exportAllUser }