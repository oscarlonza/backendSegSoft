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

export {
  objectId_validator,
  cifrarPassword
}