import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit {

  constructor(public session: SessionStorageService, private apiService: ApiService) { }
  users;
  ngOnInit() {
   //this.apiService.getUsers().subscribe((data)=>{
     // console.log(data);
      
    //});
  }
}
