import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../../../Survey';
// import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
@Component({
  selector: 'app-user-answers',
  templateUrl: './user-answers.component.html',
  styleUrls: ['./user-answers.component.css']
})
export class UserAnswersComponent implements OnInit {
    survey_questions: Survey[];
    question_name: string;
    question_choices:  any[] = [];
    question_type : string;
    newOdgovori:Object;
    radioSelected:string;
    rememberMe:string;
private _prevSelected: any;

  answers: string = "user answer!";
@Output() answersEvent = new EventEmitter<string>();
// @ViewChild('radioGroup') radioGroup: NgForm;

  constructor(private surveyService:SurveyService,) {
    const [ currentLocale, URLid ] = window.location.pathname.split('/survey/user_answers/');
console.log("URL ",URLid);
    this.surveyService.getSurveys().subscribe(surveys => {
      for(var i=0; i<surveys.length; i++){
        if (URLid==surveys[i]._id){
          this.survey_questions=surveys[i].survey_questions;
          // this.question_choices=surveys[i].survey_questions[0].question_choices;
          //
          //
          //   switch (this.survey_questions[i].question_type) {
          //    case 'open':
          //      this.question_type = 'text';
          //      break;
          //    case 'multy':
          //      this.question_type = 'checkbox';
          //      break;
          //    case 'single':
          //      this.question_type = 'radio';
          //      break;
          //    default:
          //    }
          //    console.log("aaaa ",this.question_type);
          //

        }
        }
      });

       //
       // console.log("aaaa",this.question_type);
       // let inputType;
       // switch (this.question_type) {
       //  case 'open':
       //    inputType = 'text';
       //    break;
       //  case 'multy':
       //    inputType = 'checkbox';
       //    break;
       //  case 'single':
       //    inputType = 'radio';
       //    break;
       //  default:
       //  }
       //  return inputType;
  }



  getOdgovori(noviodg){
    console.log('radi')
    console.log("noviodg",noviodg);

    var target = noviodg.target;
    this.newOdgovori += '"'+noviodg+'",';

    console.log("noviodg",this.newOdgovori);



      event.preventDefault();
      // console.log(this.survey_name);
      // this.newOdgovori = {
      //     method:"POST_ANSWERS",
      //     survey_answers:{
      //     question_name: this.question_name,
      //     question_type: this.question_type,
      //     question_choices: this.question_choices
      //   }
      // }

      // console.log("ODGOVORI",this.newOdgovori);
      // this.answersEvent.emit(this.newOdgovori)

      // this.surveyService.addSurvey(newSurvey)
      // .subscribe(survey => {
      //   this.surveys.push(survey);
      //   this.survey_name='';
      //   this.survey_description='';
      // });
  }



  sendAnswers(){

      // this.answersEvent.emit(this.answers)
    }
  ngOnInit() {
  }

}
