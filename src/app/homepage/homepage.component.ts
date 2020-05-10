import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {SessionStorageService, SessionStorage } from 'angular-web-storage';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit {

  constructor(public session: SessionStorageService, private apiService: ApiService, public router:Router, public activatedRouter:ActivatedRoute) { }
  users;
  
  searchValue: String = null;
  
  routeToSearchAll()
  {
    if (this.searchValue !== null && this.searchValue != "" && this.searchValue.replace(/\s/g, '').length)
    {
      this.router.navigate([`searchall/` + this.searchValue]);
    }
  }

  ngOnInit() {
   //this.apiService.getUsers().subscribe((data)=>{
     // console.log(data);
      
    //});
  }
}
