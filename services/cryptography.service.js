import { response } from "./utils/response.js"
import { encrypt_regex, decrypt_regex } from "./validations/functions.validations.js"
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { promisify } from 'util'
import { finished as streamFinished } from 'stream';
import { generateKeyFromPassword } from "./utils/utils.js"

const encryptFile = async (req) => {

    const { error } = encrypt_regex.validate(req)
    if (error) return response(false, error.details[0].message)

    const inputKey = req.inputKey;

    const txtFileData = req.fileData;
    console.log('Archivo enviado: ', txtFileData);

    // Decodificar el archivo de Base64
    const buffer = Buffer.from(txtFileData, 'base64');

    // Convertir el buffer a una cadena de texto
    const textContent = buffer.toString('utf8');
    console.log('Archivo ya transformado a texto: ', textContent);

    const password = generateKeyFromPassword(inputKey);
    const algorithm = 'aes-256-cbc'; // Algoritmo de cifrado
    const key = Buffer.from(password, 'hex');

    const iv = crypto.randomBytes(16); // Vector de inicialización (IV) aleatorio
    console.log('IV:' , iv);

    try {
        // Crear el cifrador
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(textContent, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        console.log('Archivo cifrado: ', encrypted);

        const fileName = 'File_encriptado.txt';
        const contentType = 'text/plain';

        // Convertir el string a un buffer
        const buffer = Buffer.from(encrypted, 'utf8');
        //console.log(buffer.length);

        // Configurar los encabezados de respuesta para la descarga del archivo
        const responseData = {
            headers: {
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': contentType,
                'Content-Length': buffer.length
            },
            buffer: buffer
        };
        return response(true, 'Archivo cifrado correctamente.', responseData)

    } catch (err) {
        console.log(err.message);

        return response(false, 'Error al cifrar el archivo.', err.message)
    }


    //const fileData = encrypt_request.inputKey



    /*const password = generateKeyFromPassword(inputKey);

    const algorithm = 'aes-256-cbc'; // Algoritmo de cifrado
    const key = Buffer.from(password, 'hex');
  
    const iv = crypto.randomBytes(16); // Vector de inicialización (IV) aleatorio

    // Crear los streams para leer y escribir el archivo
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);

    try {
        // Crear el cifrador
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        // Canalizar el input a través del cifrador y luego al output
        input.pipe(cipher).pipe(output);

        // Esperar a que la escritura termine
        await promisify(streamFinished)(output);

        // Añadir IV al principio del archivo cifrado
        const ivBuffer = Buffer.concat([iv, await fs.promises.readFile(outputFile)]);
        await fs.promises.writeFile(outputFile, ivBuffer);

        return response(true, 'Archivo cifrado exitosamente.')

    } catch (err) {

        return response(false, 'Error al cifrar el archivo.', err.message)
    }*/
}

const decryptFile = async req => {


    const { error } = decrypt_regex.validate(req)
    if (error) return response(false, error.details[0].message)

    const inputKey = req.inputKey;

    const txtFileData = req.fileData;
    console.log('Archivo enviado: ', txtFileData);

    // Decodificar el archivo de Base64
    const buffer = Buffer.from(txtFileData, 'base64');

    // Convertir el buffer a una cadena de texto
    const textContent = buffer.toString('utf8');
    console.log('Archivo transformado a texto: ', textContent);

    const password = generateKeyFromPassword(inputKey);
    const algorithm = 'aes-256-cbc'; // Algoritmo de cifrado
    const key = Buffer.from(password, 'hex');

    //const iv = crypto.randomBytes(16); // Vector de inicialización (IV) aleatorio

    try {

        // Extraer el IV (primeros 16 bytes del archivo cifrado)
        const iv = textContent.slice(0, 16);
        console.log('IV: ', iv)

        // Extraer los datos cifrados (resto del archivo)
        const encryptedData = textContent.slice(16);

        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8'); // Ajusta el formato según sea necesario
        decrypted += decipher.final('utf8');

        return response(true, 'Archivo descifrado exitosamente.')

    } catch (err) {

        return response(false, 'Error al descifrar el archivo.', err.message)
    }

    /*const inputKey = decrypt_request.inputKey;
    const inputFile = path.join(decrypt_request.inputFilePath);
    const outputFile = path.join(decrypt_request.outputFilePath);

    const password = generateKeyFromPassword(inputKey);

    const algorithm = 'aes-256-cbc'; // Algoritmo de cifrado
    const key = Buffer.from(password, 'hex');

    try {
        // Leer el archivo cifrado
        const input = fs.readFileSync(inputFile);

        // Extraer el IV (primeros 16 bytes del archivo cifrado)
        const iv = input.slice(0, 16);

        // Extraer los datos cifrados (resto del archivo)
        const encryptedData = input.slice(16);

        // Crear el descifrador
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        // Crear el flujo de escritura para el archivo descifrado
        const output = fs.createWriteStream(outputFile);

        // Desencriptar el archivo
        const buffer = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

        // Usar el flujo de escritura para guardar los datos descifrados
        output.write(buffer);
        output.end();

        // Esperar a que la escritura termine
        await promisify(streamFinished)(output);

        return response(true, 'Archivo descifrado exitosamente.')

    } catch (err) {

        return response(false, 'Error al descifrar el archivo.', err.message)
    }*/
}

export { encryptFile, decryptFile }