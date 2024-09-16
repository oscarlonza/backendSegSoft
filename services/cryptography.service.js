import { response } from "./utils/response.js"
import { encrypt_regex } from "./validations/functions.validations.js"
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const encryptFile = async encrypt_request => {

    const { error } = encrypt_regex.validate(encrypt_request)
    if (error) return response(false, error.details[0].message)

    // Rutas
    const inputKey = path.join(encrypt_request.inputKeyPath);
    const inputFile = path.join(encrypt_request.inputFilePath); // Reemplaza con la ruta de tu archivo
    const outputFile = path.join(encrypt_request.outputFilePath); // Archivo cifrado de salida


    const algorithm = 'aes-256-cbc'; // Algoritmo de cifrado
    const key = Buffer.from('659332c4f26fd1645d75da58455027e54f00eb117ad1166e0d3d86942899a40b', 'hex'); // Reemplaza con tu clave de 32 bytes
     const iv = crypto.randomBytes(16); // Vector de inicialización (IV) aleatorio
 
 
     // Cifrar el archivo
     const cipher = crypto.createCipheriv(algorithm, key, iv);
     const input = fs.createReadStream(inputFile);
     const output = fs.createWriteStream(outputFile);
 
     input.pipe(cipher).pipe(output);
 
     // Añadir IV al principio del archivo cifrado
     output.on('finish', () => {
         const ivBuffer = Buffer.concat([iv, fs.readFileSync(outputFile)]);
         fs.writeFileSync(outputFile, ivBuffer);
         console.log('Archivo cifrado exitosamente.');
         return response(true, 'Archivo cifrado exitosamente','')
     });

}

const decryptFile = async decrypt_request => {

    // Configuración
    const algorithm = 'aes-256-cbc'; // Algoritmo de cifrado
    const key = Buffer.from('659332c4f26fd1645d75da58455027e54f00eb117ad1166e0d3d86942899a40b', 'hex'); // Reemplaza con la clave generada en formato hexadecimal

    // Rutas
    const inputFile = path.join(decrypt_request.inputFilePath); // Ruta del archivo cifrado
    const outputFile = path.join(decrypt_request.outputFilePath); // Archivo descifrado de salida

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
    output.write(buffer, () => {
        output.end();
        console.log('Archivo descifrado exitosamente.');
    });

}

export { encryptFile, decryptFile }