import { Component } from '@angular/core';
import { SurveyService } from './services/survey.service';


@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[SurveyService]

})
export class AppComponent {
  title = 'app works!';
}
