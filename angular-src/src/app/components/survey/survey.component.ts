import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../../../Survey';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  surveys: Survey[];
  profile_surveys: any[]=[];
  survey_name: string;
  survey_description: string;
  survey_author:number;
  user: Object;

  // @Input() link: string;
  // @Output() linkEvent = new EventEmitter<string>();
  constructor(private route: ActivatedRoute, private surveyService:SurveyService,  private authService: AuthService, private router: Router) {
// console.log('authService',authService);
this.surveyService.getSurveys()
    .subscribe(surveys => {
      for (var i=0; i< surveys.length; i++){
            console.log("surveys");
              this.surveys=surveys;
          }
    });

    this.authService.getProfile().subscribe(profile =>{
        this.user = profile.user._id;
        console.log("LISTA ",this.surveys);
        // var profile_surveys=[];
          for (var i=0; i< this.surveys.length; i++){
            if (this.user==this.surveys[i].survey_author){

              // console.log("IF surveys",this.surveys[i]);
                  this.profile_surveys.push(this.surveys[i]);
            }
        }
        // console.log("IF TRUE",this.profile_surveys);
        console.log("profile.user._id: ",profile.user._id);
      }, err => {   //it is absorbable so it can return error
        console.log(err);
        return false;
    });
  }


  addSurvey(event){
    console.log('radi')
      event.preventDefault();
      // console.log(this.survey_name);
      var newSurvey = {
        survey_name: this.survey_name,
        survey_description: this.survey_description,
        survey_author:  this.user
      }

      this.surveyService.addSurvey(newSurvey)
      .subscribe(survey => {
        this.surveys.push(survey);
        this.survey_name='';
        this.survey_description='';
      });
  }
  deleteSurvey(id){
    var surveys=this.surveys;
    this.surveyService.deleteSurvey(id).subscribe(data =>{
      if(data.n==1){
        for(var i=0; i<surveys.length; i++){
          if(surveys[i]._id == id){
            surveys.splice(i,1);
          }
        }
      }
    });
  }
  ///////////////// UPDATE!!!! VIDEO MEAN App From Scratch - MongoDB, Express, Angular 2 & NodeJS
  ngOnInit() {
  }

}
