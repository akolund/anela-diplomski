import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent implements OnInit {
user: Object; //add user as property
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
// load the user when he is initialized
//so we gonna put that in ngOnInit()
  ngOnInit() {
        // console.log("AAAAAAAAAAAAAAAAAAAAAAA");
  //getProfile() is function from auth.service.ts
  //it is absorbable, so subscribe give us data from profile
  this.authService.getProfile().subscribe(profile =>{

      this.user = profile.user;
    }, err => {   //it is absorbable so it can return error
      console.log(err);

      return false;

  });
  }

}
