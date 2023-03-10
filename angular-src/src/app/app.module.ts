import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SurveyComponent } from './components/survey/survey.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { FlashMessagesService } from 'angular2-flash-messages';

import { SurveyService } from './services/survey.service';
import { SurveyIdComponent } from './components/survey-id/survey-id.component';
import { UserAnswersComponent } from './components/user-answers/user-answers.component';



const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent}, //canActivate:[AuthGuard] protect for every rout
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'survey', component: SurveyComponent},
  {path:'survey/:id', component: SurveyIdComponent},
  {path:'survey/user_answers/:id', component: UserAnswersComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    SurveyComponent,
    SurveyIdComponent,
    UserAnswersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
  ],
  providers: [ValidateService,AuthService,FlashMessagesService,  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
