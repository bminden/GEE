import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { stringify } from 'querystring';
import { Router, ActivatedRoute } from "@angular/router";
import {SessionStorageService, SessionStorage } from 'angular-web-storage';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  SearchForm: FormGroup
  constructor(private apiService: ApiService, public session: SessionStorageService, private router: Router) { }
  searcher(keywords:string, subject:string, gradeLevel:string, contentType:string, worksheets:string, labs:string, exams:string){
    var includes = worksheets.concat(", ", labs, ", ", exams);
    this.apiService.search(keywords, subject, gradeLevel, contentType, includes).subscribe((data)=>{
     console.log(data);
     if (data["data"] === 0)
     {
      alert("Bad News");
     } 
     else{
      this.session.set("data", data);
      this.router.navigateByUrl("results");
    }
  });}

  ngOnInit() {
    
    this.SearchForm = new FormGroup({
    });
  }

}
