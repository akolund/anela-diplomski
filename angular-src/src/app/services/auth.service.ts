import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http:Http) { }
  registerUser(user){     //function to register user (backend API to take POST register)
    let headers = new Headers(); // set header value
    headers.append('Content-Type', 'application/json'); // this is how to add value to header. Its going to be json form
    //we want to return in absorbable with the response
    //itsgoing to be post request
    //url is our backend 3000
    //pass alonguser(the data) and optionst (headers)

    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
  .map(res => res.json());
  }

  authenticateUser(user){  //authenticate, ako je TRUE/Successful vraca token i sprema res(rezultat u json )  takoder vraca User info
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }
    //[ Part 9 ]
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);  //here we have added extra header
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile',   {headers: headers})
    .map(res => res.json());
  }
  //[ Part 9 ]
loadToken(){
  const token = localStorage.getItem('id_token');
  this.authToken = token; //set that authToken what we have pulled from local storage
  //authToken isa class property from line 9 so we can access it from anywhere
}

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  //[ Part 9 ]
  // loggedIn(){
  // return tokenNotExpired();
  // return tokenNotExpired('id_token')
  loggedIn() { if('id_token'){ return tokenNotExpired('id_token'); } }﻿
// }

  logout(){
    this.authToken = null;
    this.user= null;
    localStorage.clear();
  }

}
