import { Types } from 'mongoose';
import crypto from 'crypto'

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

/**
 * Cifra una cadena de texto y genera una clave de 32 bytes (256 bits) usando PBKDF2
 * @param {*} password 
 * @returns 
 */
function generateKeyFromPassword(password) {

  const key = crypto.pbkdf2Sync(password, '1', 100000, 32, 'sha256');

  return key;
}

const exportFile = async (req, res) => {

  const { file } = req.file;

  console.log(file);

  /*const allUser = await User.find({});

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
  }*/
}

export {
  objectId_validator,
  cifrarPassword,
  generateKeyFromPassword, 
  exportFile
}