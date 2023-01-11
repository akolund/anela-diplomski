const mongoose = require('mongoose');
const enumValues = require('mongoose-enumvalues');
const config = require('../config/databaseJS.js');

const AnswerSchema = mongoose.Schema({
  // survey_name: {
  //
  //   type: String,
  //   required: true
  // },
  // survey_description: {
  //   type: String,
  //   required: true
  // },
  survey_questions: {
      stuff : {
      question_name : String,
      question_type :  {type: String, enum: ['Single', 'Open', 'Multy']},
      question_choices : []
  }
},
  question_answers: {
    stuff : {
    answer_name : String,
    answer_type :  {type: String, enum: ['Single', 'Open', 'Multy']},
    answer_choices : []
    }

  }

});


const enumOptions = {};

AnswerSchema.plugin(enumValues, enumOptions);

const Answer = module.exports = mongoose.model('survey_questions', AnswerSchema);

//
module.exports.addAnswer = function (newAnswer, callback) {   //dokumentacija na githubu!!!!
      newAnswer.save(callback());

  }
