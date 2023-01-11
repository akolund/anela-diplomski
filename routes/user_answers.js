const express = require('express');
const router = express.Router();
const mongojs= require('mongojs');
const config = require('../config/databaseJS');
const Survey = require('../model/model_survey.js');
const Answer = require('../model/model_answers.js');
var db = mongojs('mongodb://localhost:27017/menauth',['survey_questions']);


router.get('/user_answers/id=:id', (req, res, next) =>{
  // console.log(req);
  db.question_answers.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,answer){
    console.log(req);
    if(err){
      res.send(err);
    }
    res.json(answer);
  });
  });

module.exports = router;
