const express = require('express');
const router = express.Router();
const mongojs= require('mongojs');
const config = require('../config/databaseJS');
const Survey= require('../model/model_survey.js');

var itemRouter = express.Router({mergeParams: true});

var db = mongojs('mongodb://localhost:27017/menauth',['surveys']);
//Get All Suveys
//ADD NEW
// router.post('/surveys', (req, res, next) =>{
//   // console.log('REGISTER');
//   // res.send('REGISTER');
//   let newSurvey = new Survey({
//     survey_name: req.body.survey_name
//     survey_description: req.body.survey_description
//     author: req.body.author
//
//
//   });
//   // newSurvey.save();
//
//     Survey.addSurvey(newSurvey,(err, survey)=>{
//       if (err){
//         res.json({success: false, msg:'Failed '});
//       }else{
//         res.json({success: true, msg:'ADDED  '});
//
//       }
//     });
// });
router.get('/surveys', (req, res, next) =>{
  // console.log("sve");
  db.surveys.find(function(err,surveys){
    if(err){
      res.send(err);
    }
    res.json(surveys);
  });
});

//SINGLE SURVEY
  router.get('/surveys/id=:id', (req, res, next) =>{
    // console.log(req);
    db.surveys.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,survey){
      if(err){
        res.send(err);
      }
      res.json(survey);
    });
    });
//GT SINGLE QUESTION FROM SINGLE SURVEY
  // itemRouter.get('/surveys;id=:id;quest=:id', (req, res, next) =>{
  //      console.log(req);
  //   db.surveys.findOne({id:mongojs.ObjectId(req.params.id)},function(err,survey){
  //     if(err){
  //       res.send(err);
  //     }
  //     res.json(survey);
  //   });
  //   });
//POST SINGLE QUESTION FROM SINGLE SURVEY



//SAVE Survey
router.post('/surveys/', (req, res, next) =>{
  var survey = req.body;
  if(!survey.survey_name){
    res.status(400);
    res.json({"error": "Bad data"});
  }else{
    db.surveys.save(survey, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(survey);
    });
  }
});
//delete survey
router.delete('/surveys/:id', (req, res, next) =>{
  db.surveys.remove({_id:mongojs.ObjectId(req.params.id)},function(err,survey){
      if(err){
        res.send(err);
      }
      res.json(survey);
    });
  });

//Update class

//UPDATE SURVEY QUESTION
router.put('/surveys/id=:id', (req, res, next) =>{
  var survey = req.body;
  var updateSurvey = {};

  console.log("survey.survey_questions",req.body);
  if(survey.survey_questions){
    updateSurvey.survey_questions = survey.survey_questions;
    var pom_za_rename = survey.survey_questions;
    console.log("aaaaaa",pom_za_rename);
  }
  if(!updateSurvey){
    res.status(400);
    res.json({"error": "Bad data"})
  }else{//UBACIVA PITANJE U ODREDENI UPITNIK
        if(req.body.method=="POST_QUESTION"){
        db.surveys.update({_id:mongojs.ObjectId(req.params.id)},{$push:{"survey_questions": survey.survey_questions}}, function(err,survey){
          if(err){
            res.send(err);
          }
          res.json(survey);
          });
        }//BRIŠE PITANJE IZ ODREDENOG UPITNIKA
        if(req.body.method=="DELETE_QUESTION"){
          console.log("DELETEEE");
          db.surveys.update({_id:mongojs.ObjectId(req.params.id)},{$pull: updateSurvey }, function(err,survey){

          if(err){
            res.send(err);
          }
          res.json(survey);
          });
        } // MIJENJA NAZIV PITANJA U ODREDENOM UPITNIKU
        if(req.body.method=="RENAME_QUESTION"){
          var nova_varijabla='"survey_questions.'+req.body.redni_br+'.'+Object.keys(survey.survey_questions)+'":"'+Object.values(survey.survey_questions)+'"' ;
        //  var nova_varijabla2= {};
        //  var nova_varijabla3= {};
        //   nova_varijabla3=nova_varijabla;

          var nova_varijabla2=Object.keys(req.body)[2]+'.'+req.body.redni_br+'.'+Object.keys(survey.survey_questions)+":"+Object.values(survey.survey_questions) ;

          console.log("RENAMEEE",req.body.redni_br);
        //  console.log("nova_varijabla2",nova_varijabla2);
        //  console.log("nova_varijabla3",nova_varijabla3);
          // var object = survey.survey_questions ,
     // result = Object
     //    .keys(object)
     //    .map(k => ({ [k]: object[k] }));

          nova_varijabla=nova_varijabla.replace(/[{}}]/g, '');
          console.log("nova_varijabla",nova_varijabla);
          db.surveys.update({_id:mongojs.ObjectId(req.params.id)},{$set: nova_varijabla2 },function(err,survey){
          if(err){
            res.send(err);
          }
          res.json(survey);
          });
        }



  }

});

// router.put('/surveys/id=:id', (req, res, next) =>{
//   var question = req.body;
//   var updateQuestion = {};

  // console.log("question", question);
  // if(survey.survey_questions){
  //   updateQuestion.survey_questions = survey.survey_questions;
  //   // console.log("aaaaaa",updateSurvey);
  // }
  // if(!updateQuestion){
  //   res.status(400);
  //   res.json({"error": "Bad data"})
  // }else{
  //   db.surveys.update({_id:mongojs.ObjectId(req.params.id)},{$pull:{"survey_questions": updateQuestion,{}}}, function(err,survey){
  //
  //     if(err){
  //       res.send(err);
  //     }
  //     res.json(survey);
  //   });
  // }

// });




// router.post('/surveys/id=:id', (req, res, next) =>{
//   var survey_question = req.body;
//   console.log("req.body",req.body);
//   console.log("survey_question.survey_questions",survey_question.survey_questions);
//   if(!survey_question.survey_questions){
//     res.status(400);
//     res.json({"error": "Bad data"});
//   }else{
//     db.survey_questions.save(survey_question, function(err, task){
//       if(err){
//         res.send(err);
//       }
//       res.json(survey_question);
//     });
//   }
// });

//
//
// router.get('/surveys',function(req,res,next){
//
//       var props = Object.keys(Survey.schema.paths);
//           console.log(props);
//           //[ 'survey_name', 'survey_description', 'author', .... '_id', '__v' ]
//           res.json(Survey.schema.paths);
//
//
//
//
//
//   //           let modelAttributes = null;
//   // Survey.findById('5b29789b067659e89a345428').populate('survey_questions').exec().then((result) => {
//   //   modelAttributes = result.toObject();
//   //   console.log(modelAttributes);
//   // });
//
//       Survey.schema.eachPath(function(survey) {
//           console.log(survey);
//           var props = Object.keys(Survey.schema.paths);
//               console.log(survey);
//               // console.log(Survey);
//       });
// });
// router.get('/surveys',function(req,res,next){
//
//       var props = Object.keys(Survey.schema.paths);
//           console.log(props);
//           Survey.props.find(function(err,surveys){
//             if(err){
//               res.send(err);
//             }
//             res.json(surveys)
//           });
//
// });


module.exports=router;
//Regiter
// router.post('/survey', (req, res, next) =>{
//   // console.log('REGISTER');
//   // res.send('REGISTER');
//   let newSurvey = new Survey({
//     survey_name: req.body.survey_name,
//     survey_description: req.body.survey_description,
//     author: req.body.author
//   });
//
//   });
