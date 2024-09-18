import { response } from "./utils/response.js"
import User from '../models/user.js'
import { export_regex, encrypt_regex } from "./validations/functions.validations.js"
import fs from 'fs/promises'
import path from 'path'
import { Readable } from 'stream';

const exportAllUser = async export_request => {

    /*const { error } = export_regex.validate(export_request)
    if (error) return response(false, error.details[0].message)*/

    //const allUser = await User.find({});
    //const dataString = allUser.map(doc => JSON.stringify(doc)).join('\n');
    const dataString = 'Aquí van los datos que quieres exportar.';

    try {
        
        const fileName = 'exported_data.txt';
        const contentType = 'text/plain';

        // Convertir el string a un buffer
        const buffer = Buffer.from(dataString, 'utf8');

        // Crear un readable stream desde el buffer
        const readableStream = Readable.from(buffer);

        // Configurar los encabezados de respuesta para la descarga del archivo
        export_request.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        export_request.setHeader('Content-Type', contentType);
        export_request.setHeader('Content-Length', buffer.length);

        // Enviar el stream al cliente
        readableStream.pipe(export_request);

        // Manejar el evento 'finish' para enviar un mensaje de éxito
        readableStream.on('finish', () => {
            console.log('Archivo enviado exitosamente.');
            return response(true, 'Archivo enviado exitosamente.');
            
        });

        // Manejar errores del stream
        readableStream.on('error', (err) => {
            return response(false, 'Error al leer el stream: ', err);
        });

    } catch (err) {
        // Manejar cualquier otro error
        return response(false, 'Error en la exportación: ', err);
    }

    /*const dataString = 'Aquí van los datos que quieres exportar.';
    const fileName = 'exported_data.txt';
    const contentType = 'text/plain';

    // Convertir el string a un buffer
    const buffer = Buffer.from(dataString, 'utf8');

    // Crear un readable stream desde el buffer
    const readableStream = Readable.from(buffer);
    //console.log(readableStream);

    // Configurar los encabezados de respuesta para la descarga del archivo
    export_request.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    export_request.setHeader('Content-Type', contentType);
    export_request.setHeader('Content-Length', buffer.length);

    // Enviar el stream al cliente
    readableStream.pipe(export_request);*/


    /*const outputFilePath = path.join(export_request.outputFilePath);

    const allUser = await User.find({});
    const dataString = allUser.map(doc => JSON.stringify(doc)).join('\n');

    // Escribir la cadena en un archivo
    try {
        await fs.writeFile(outputFilePath, dataString, 'utf8');
        return response(true, `Datos exportados a ${outputFilePath}`, { allUser });
    } catch (err) {
        return response(false, 'Error al escribir el archivo: ', err);
    }*/
}

export { exportAllUser }