import { Types } from 'mongoose';
import crypto from 'crypto'

const format_question_response = inbound_question => {

  const { _id, difficulty, question, wrong_answer, correct_answer } = inbound_question[0]

  const options = [...wrong_answer, correct_answer].sort(() => Math.random() - 0.5)

  const question_response = {
    _id,
    difficulty,
    question,
    options
  }

  return question_response
}

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
  format_question_response,
  objectId_validator,
  cifrarPassword
}