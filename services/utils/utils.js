import { Types } from 'mongoose';

const format_question_response  = inbound_question => {

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

export {
  format_question_response,
  objectId_validator
}