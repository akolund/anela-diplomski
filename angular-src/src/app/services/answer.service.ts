import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AnswerService {
    constructor(private http:Http, private httpClient: Http) {
      console.log('Survey service initialized....');
  }
///////IZLISTAJ SVE UPITNIKE
  getAnswers(){
    return this.http.get('http://localhost:3000/api/user_answers')
    .map(res => res.json());
  }


  // getSurveysQuestion(){
  //   return this.http.get('http://localhost:3000/api/surveys?_id')
  //   .map(res => res.json());
  // }
//   getSurveysQuestion(){
//     this.httpClient.get('http://localhost:3000/api' + '/surveys').subscribe((res)=>{
//         console.log("getSurveysQuestion",res);
//     });
// }
// //////DODAJ NOVI UPITNIK
// addSurvey(newSurvey){
//   console.log(newSurvey);
//   console.log("ADD NEW SURVEY FJA");
//
//   var headers = new Headers();
//   console.log(headers);
//   headers.append('Content-type', 'application/json');
//   return this.http.post('http://localhost:3000/api/surveys',JSON.stringify(newSurvey),{headers:headers})
//   .map(res=> res.json());
//
// }
// ///////IZBRIŠI UPITNIK
// deleteSurvey(id){
//   return this.http.delete('http://localhost:3000/api/surveys/'+id)
//   .map(res => res.json());
// }
//
// ///////DODAJ PITANJE
// addQuestion(newQuestion,id){
//   console.log("ADD QUESTION",newQuestion);
//
//   var headers = new Headers();
//   headers.append('Content-type', 'application/json');
//   console.log(headers);
//   return this.http.put('http://localhost:3000/api/surveys/id='+id,JSON.stringify(newQuestion),{headers:headers})
//   .map(res=> res.json());
//
// }
// ///////IZBRISI PITANJE
// removeQuestion(remQuestion,id){
//   console.log("ADD QUESTION",remQuestion);
//
//   var headers = new Headers();
//   headers.append('Content-type', 'application/json');
//   console.log(headers);
//   return this.http.put('http://localhost:3000/api/surveys/id='+id,JSON.stringify(remQuestion),{headers:headers})
//   .map(res=> res.json());
//
// }
// renameQuestion(renameQuestion,id){
//   console.log("ADD QUESTION",renameQuestion);
//
//   var headers = new Headers();
//   headers.append('Content-type', 'application/json');
//   console.log(headers);
//   return this.http.put('http://localhost:3000/api/surveys/id='+id,JSON.stringify(renameQuestion),{headers:headers})
//   .map(res=> res.json());
//
// }

}
