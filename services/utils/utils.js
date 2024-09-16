import { Types } from 'mongoose';
import crypto from 'crypto'
import fs from 'fs/promises'


const objectId_validator = (value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

//Cifra una cadena de caracteres usando SHA-1
const cifrarPassword = (strPassword) => {

  const tempSHA1 = crypto.createHash('sha1');
  tempSHA1.update(strPassword);
  const hashedPassword = tempSHA1.digest('hex');

  return hashedPassword;
}

async function readAndValidateFile(filePath) {

  try {
    // Leer el archivo
    const content = await fs.readFile(filePath, 'utf8');
    // Si la lectura es exitosa, devolver el contenido del archivo
    return {
      success: true,
      message: 'Archivo leído exitosamente.',
      data: content
    };
  } catch (err) {
    return {
      success: false,
      message: 'Error al leer el archivo.',
      error: err.message
    };
  }
}

export {
  objectId_validator,
  cifrarPassword,
  readAndValidateFile
}