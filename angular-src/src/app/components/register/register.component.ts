import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private ValidateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private AuthService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    // console.log(this.name);
    const user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
    }
      //Required Fields
    if(!this.ValidateService.validateRegister(user)){
      // console.log("Please fill in all fields");

      this._flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 1000 });
      // console.log("Please fill in all fields");
      return false;
    }
    //Validate email
    if(!this.ValidateService.validateEmail(user.email)){
      // console.log("Please use a valid email");
      this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 1000 });

      return false;
    }

    //Register user

    this.AuthService.registerUser(user).subscribe(data=>{
      if(data.success){
        this._flashMessagesService.show('You are now registered and can login ', { cssClass: 'alert-green', timeout: 1000 });
        this.router.navigate(['/login']);
      }else{
        this._flashMessagesService.show('Something went wrong ', { cssClass: 'alert-danger', timeout: 1000 });
        this.router.navigate(['/register']);

      }
    });


  }
}
