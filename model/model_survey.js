const mongoose = require('mongoose');
const enumValues = require('mongoose-enumvalues');
const config = require('../config/databaseJS.js');

const SurveySchema = mongoose.Schema({
  survey_name: {
    type: String,
    required: true
  },
  survey_description: {
    type: String,
    required: true
  },
  survey_author: {
    type: String,
    required:true
  },
  survey_questions: {
      stuff : {
      question_name : String,
      question_type :  {type: String, enum: ['Single', 'Open', 'Multy']},
      question_choices : []
  }
}

});


const enumOptions = {};

SurveySchema.plugin(enumValues, enumOptions);

const Survey = module.exports = mongoose.model('surveys', SurveySchema);


module.exports.addSurvey = function (newSurvey, callback) {   //dokumentacija na githubu!!!!
      newSurvey.save(callback());

  }
