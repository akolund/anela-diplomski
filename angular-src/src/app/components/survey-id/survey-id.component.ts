import { Component, OnInit,Output,Input, EventEmitter } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../../../Survey';
import { Router } from '@angular/router';

// import { FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-id',
  templateUrl: './survey-id.component.html',
  styleUrls: ['./survey-id.component.css']
})
export class SurveyIdComponent implements OnInit {
  survey_questions: Survey[];
  Upitnik: Object;
  survey_questions_pom: any[] = [];
  question_name: string;
  id: string;
  question_choices:  any[] = [];

  question_typeValue = [
         {id: 1, name: "Single"},
         {id: 2, name: "Multy"},
         {id: 3, name: "Open"}
       ]
  question_type : any[] = [];
  errors : string;
  redni_br : number;
  textarea: string;
  answers="HEEEEJ";

  //SALJE SE user-answers KOMPONENTU
  @Output() anketa = new EventEmitter<any>();



  constructor(private surveyService:SurveyService, private router: Router) {
    const [ currentLocale, URLid ] = window.location.pathname.split('/survey/');
    console.log('URL_id',URLid);// ID ANKETE IZ URL-A
        this.id=URLid;
        console.log("errr",this.errors);
        this.surveyService.getSurveys().subscribe(surveys => {
          for(var i=0; i<surveys.length; i++){
            if (URLid==surveys[i]._id){
              // console.log("TO JE TAJ ",surveys[i].survey_questions[0].question_name); //varijable su sve unutar [{}]
              // this.id=surveys[i]._id;
              this.survey_questions=surveys[i].survey_questions;
              this.survey_questions_pom=surveys[i].survey_questions;
              // this.question_name=surveys[i].survey_questions[0].question_name;
              // this.question_type=surveys[i].survey_questions[0].question_type;
        //       // this.question_choices=surveys[i].survey_questions[0].question_choices;
                  // this.Upitnik.emit(surveys[i]);
        //       // let array_questions = Object.keys(this.survey_questions);
        //       // let questions = [];
        //       // for (props of array_questions) {
        //       //   questions.push(array_questions[prop]);
        //       // }
        //       // this.survey_questions = surveys.survey_questions;
        //       // console.log("this.survey_questions",this.survey_questions);
            }
            }
          });

    }

    parseTextArea() {
          this.question_choices = this.textarea.split("\n");
      }


    //DODAVANJE PITANJA, MOZE SE BIRATI TIP
    addQuestion(event){
    if (this.survey_questions_pom==undefined){this.survey_questions_pom=[];}
            for(var i=0; i < this.survey_questions_pom.length; i++){
              console.log("sada", this.question_type);
             // console.log("PITANJA",this.survey_questions_pom[i]);
             if((this.question_name==undefined || this.question_name=='')  || this.question_type==undefined || (this.question_choices==undefined || this.question_choices==[] ))
             { console.log("nemoze");
              this.errors=undefined;
               this.errors= "Ispunite sva polja";

             }
              if(this.question_name==this.survey_questions_pom[i].question_name)
              { console.log("nemoze");
                this.errors=undefined;
                this.errors= "Pitanje tog naziva postoji";
                this.question_name='';
              }

            }
        // event.preventDefault();
          //PROVJERA DA LI JE SVE USPJESNO ISPUNJENO
          if ((this.question_name!=undefined && this.question_name!='' ) &&  this.question_type.length>0 && this.question_choices.length>0)

          var newQuestion = {
            method:"POST_QUESTION",
            survey_questions:{
              question_name: this.question_name,
              question_type: this.question_type,
              question_choices: this.question_choices
            }

          }

        this.surveyService.addQuestion(newQuestion,this.id).subscribe(question => {
          console.log("question",question);  //question {n: 1, nModified: 1, ok: 1}
          this.survey_questions.push(question);
          this.question_name='';
          this.question_type= [];
          this.question_choices= [''];
        });
      }

/////////RENAME QUESTION

      renameQuestion(newName){
        // event.preventDefault();
    for(var i=0; i < this.survey_questions_pom.length; i++){
      if(newName==this.survey_questions_pom[i].question_name){
        this.redni_br=i;
            console.log("redni broj pitanja", this.redni_br);
            }
          }

            var renameQuestion = {
              method:"RENAME_QUESTION",
              redni_br:this.redni_br,
              survey_questions:{
                question_name:newName

              }
            }
            console.log("evo",newName);
          //
          this.surveyService.renameQuestion(renameQuestion,this.id).subscribe(question => {
            console.log("question",question);  //question {n: 1, nModified: 1, ok: 1}
            console.log("subscribe this.survey_questions",this.survey_questions);  //question {n: 1, nModified: 1, ok: 1}
            this.survey_questions.push(question);

          });
        }
/////////CHANGE QUESTION

      removeQuestion(question_name){
          event.preventDefault();
            //PROVJERA DA LI JE SVE USPJESNO ISPUNJENO
            var remQuestion = {
              method:"DELETE_QUESTION",
              survey_questions:{
                question_name: question_name
              }
            }
            console.log("evo",remQuestion);

          this.surveyService.addQuestion(remQuestion,this.id).subscribe(question => {
            console.log("question",question);  //question {n: 1, nModified: 1, ok: 1}
            this.survey_questions.push(question);

          });
        }
        ngOnInit() {
        }

        receiveAnswers($event){
          this.answers=$event;
        }
        sendAnketa (){
            this.anketa.emit(this.Upitnik);
          }
      }
