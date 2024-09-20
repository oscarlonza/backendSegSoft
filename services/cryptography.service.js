import { response } from "./utils/response.js"
import { encrypt_regex, decrypt_regex } from "./validations/functions.validations.js"
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { promisify } from 'util'
import { finished as streamFinished } from 'stream';
import { generateKeyFromPassword } from "./utils/utils.js"


const iv = crypto.randomBytes(16); // Vector de inicialización (IV) aleatorio
//const iv = crypto.getRandomValues(new Uint8Array(12));

const encryptFile = async (req) => {

    try {
        const { error } = encrypt_regex.validate(req)
        if (error) return response(false, error.details[0].message)
    
        const inputKey = req.inputKey;
    
        const txtFileData = req.fileData;
        console.log('Archivo enviado: ', txtFileData);
    
        // Convertir el buffer a una cadena de texto
        const textContent = atob(txtFileData);    
        console.log('Archivo ya transformado a texto: ', textContent);

        // Decodificar el archivo de Base64
        const buffer = Buffer.from(txtFileData, 'base64');
    
        const encoder = new TextEncoder().encode(inputKey);
    
        // Hashear el inputKey utilizando SHA-256
        const hash = await crypto.subtle.digest('SHA-256', encoder);
    
        const key = await crypto.subtle.importKey(
            'raw',
            hash,
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        );
    
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            buffer
        );
    
        const encryptedString = Buffer.from(encrypted).toString('base64');
    
        console.log('Archivo cifrado: ', encrypted);
        console.log('Archivo cifrado: ', encryptedString);
    
        const fileName = req.fileName||'encryptedFile.data';
    
        //return { iv, encrypted };
        return response(true, 'Archivo cifrado correctamente.', { encrypted })
    } catch (error) {
        return response(false, 'Error al cifrar el archivo.', error.message)        
    }

}

const decryptFile = async req => {


    try {
        const { error } = decrypt_regex.validate(req)
        if (error) return response(false, error.details[0].message)
    
        const inputKey = req.inputKey;
    
        const txtFileData = req.fileData;
        console.log('Archivo enviado: ', txtFileData);
    
        // Convertir el buffer a una cadena de texto
        const textContent = atob(txtFileData);
        console.log('Archivo ya transformado a texto: ', textContent);

        // Decodificar el archivo de Base64
        const buffer = Buffer.from(txtFileData, 'base64');
        
        const encoder = new TextEncoder().encode(inputKey);
    
        // Hashear el inputKey utilizando SHA-256
        const hash = await crypto.subtle.digest('SHA-256', encoder);
    
        const key = await crypto.subtle.importKey(
            'raw',
            hash,
            { name: 'AES-GCM' },
            false,
            ['decrypt']
        );
    
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            buffer
        );
    
        const decryptedString = Buffer.from(decrypted).toString('base64');
        const decryptContent = atob(decryptedString);
    
        console.log('Archivo descifrado: ', decrypted);
        console.log('Archivo descifrado: ', decryptedString);
    
        //return decrypted;
        return response(true, 'Archivo descifrado correctamente.', {decrypted})
    } catch (error) {
        return response(false, 'Error al descifrar el archivo.', error.message)       
    }
}

export { encryptFile, decryptFile }