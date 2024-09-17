import { response } from "./utils/response.js"
import { encrypt_regex, decrypt_regex } from "./validations/functions.validations.js"
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { promisify } from 'util'
import { finished as streamFinished } from 'stream';

const encryptFile = async encrypt_request => {

    const { error } = encrypt_regex.validate(encrypt_request)
    if (error) return response(false, error.details[0].message)

    const inputKey = encrypt_request.inputKey;
    const inputFile = path.join(encrypt_request.inputFilePath);
    const outputFile = path.join(encrypt_request.outputFilePath);

    const algorithm = 'aes-256-cbc'; // Algoritmo de cifrado
    const key = Buffer.from(inputKey, 'hex');
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

        return response(false, 'Error al cifrar el archivo.')
    }
}

const decryptFile = async decrypt_request => {

    const { error } = decrypt_regex.validate(decrypt_request)
    if (error) return response(false, error.details[0].message)

    const inputKey = decrypt_request.inputKey;
    const inputFile = path.join(decrypt_request.inputFilePath);
    const outputFile = path.join(decrypt_request.outputFilePath);

    const algorithm = 'aes-256-cbc'; // Algoritmo de cifrado
    const key = Buffer.from(inputKey, 'hex');

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
        
        return response(false, 'Error al descifrar el archivo.')
    }
}

export { encryptFile, decryptFile }