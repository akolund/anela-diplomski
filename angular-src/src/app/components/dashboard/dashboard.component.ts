import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
// public items: Array<string>;
  constructor( private router: Router) {
       // this.items = ["item1", "item2", "item3"]
  }

  ngOnInit() {
          
  }





   // public open(event, item) {
   //   alert('Open ' + item);
   // }


   getSurvey(){
    console.log(123);
  }
}
